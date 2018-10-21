import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Terminal } from 'xterm';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { filter, map } from 'rxjs/operators';
import { ItemType } from 'src/app/models/generic.models';
import { Node, defaultNode } from 'src/app/models/node.models';
import { SortByDateValue } from 'src/utilities/utilityFunctions';
import { firestore } from 'firebase/app';

@Component( {
	selector: 'app-admin-node-console',
	templateUrl: './admin-node-console.component.html',
	styleUrls: [ './admin-node-console.component.scss' ]
} )
export class AdminNodeConsoleComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild( 'terminal' ) terminal: ElementRef;
	public node: Node = defaultNode();
	public term: Terminal;

	private subs = subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.pipe(
			filter( i => !!i.id ),
			map( i => ( { ...i, type: ItemType.node } as Node ) )
		).subscribe( i => {
			this.node = i;
			if ( this.term ) this.term.focus();
			if ( this.node.responses ) {
				this.node.responses.forEach( re => re.dateValue = re.date.toDate() );
				this.node.responses.sort( SortByDateValue );
				if ( this.node.responses.length > 0 ) {
					const response = this.node.responses.shift();
					this.term.write( response.datum );
					delete response.dateValue;
					this.db.doc( '/nodes/' + this.node.id ).
						update( { responses: firestore.FieldValue.arrayRemove( response ) } );
				}
			}
		} ) );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	ngAfterViewInit() {
		this.term = new Terminal( { cursorBlink: true, scrollback: 60 } );
		this.term.on( 'key', ( key, event ) => {
			this.db.doc( '/nodes/' + this.node.id ).
				update( { keypresses: firestore.FieldValue.arrayUnion( { key, date: new Date() } ) } );
		} );
		this.term.open( this.terminal.nativeElement );
		this.term.clear();
	}

}
