import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, AfterContentInit } from '@angular/core';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ItemType } from 'src/app/models/generic.models';
import { Node, defaultNode } from 'src/app/models/node.models';
import { SortByDateValue } from 'src/utilities/utilityFunctions';
import { firestore } from 'firebase/app';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component( {
	selector: 'app-admin-node-console',
	templateUrl: './admin-node-console.component.html',
	styleUrls: [ './admin-node-console.component.scss' ]
} )
export class AdminNodeConsoleComponent implements OnInit, AfterContentInit, OnDestroy {
	public screenHeight = 300;
	public screenWidth = 100;
	private afterInited = false;
	@ViewChild( 'terminal' ) terminal: ElementRef;

	public node: Node = defaultNode();
	public term: Terminal;

	private terminalDimensions$ = new BehaviorSubject( { cols: 0, rows: 0 } );

	private subs = subsCreate();

	@HostListener( 'window:resize', [ '$event' ] ) onResize( event?) {
		if ( this.afterInited ) {
			this.screenHeight = window.innerHeight;
			this.screenWidth = window.innerWidth;
			setTimeout( () => fit( this.term ), 1 );
		} else {
			setTimeout( () => this.onResize(), 1000 );
			console.log( 'Host listener, is called but doing nothing, afterinited is false, we will retry in 1 sec' );
		}
	}
	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push(
			combineLatest(
				this.ss.cItem$.pipe( filter( i => !!i.id ), map( i => ( { ...i, type: ItemType.node } as Node ) ) ),
				this.terminalDimensions$
			).subscribe( async ( [ i, terminalDims ] ) => {
				this.node = i;
				if ( this.term ) this.term.focus();
				if ( this.node.responses ) {
					this.node.responses.forEach( re => re.dateValue = re.date.toDate() );
					this.node.responses.sort( SortByDateValue );
					if ( this.node.responses.length > 0 ) {
						await this.waitForConsole();
						const response = this.node.responses.shift();
						this.term.write( response.datum );
						delete response.dateValue;
						await this.db.doc( '/nodes/' + this.node.id ).update( { responses: firestore.FieldValue.arrayRemove( response ) } );
					}
				}
				await this.db.doc( '/nodes/' + this.node.id ).update( {
					'terminal.dimensions.cols': terminalDims.cols,
					'terminal.dimensions.rows': terminalDims.rows
				} ).catch( console.error );
			} )
		);
	}

	private waitForConsole = () => {
		return new Promise( ( resolve, reject ) => {
			if ( this.term ) {
				resolve();
			} else {
				setTimeout( this.waitForConsole, 200 );
			}
		} );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	ngAfterContentInit() {
		this.afterInited = true;
		this.term = new Terminal( { cursorBlink: true, scrollback: 60, rows: 1, cols: 10 } );
		this.term.on( 'key', ( key, event ) => {
			this.db.doc( '/nodes/' + this.node.id ).
				update( { keypresses: firestore.FieldValue.arrayUnion( { key, date: new Date() } ) } );
		} );
		this.term.on( 'resize', ( resizeData: { cols: number, rows: number } ) => {
			this.terminalDimensions$.next( resizeData );
		} );
		this.term.open( this.terminal.nativeElement );
		this.term.clear();
		this.onResize();
	}

	public windowResized = () => {

	}

}
