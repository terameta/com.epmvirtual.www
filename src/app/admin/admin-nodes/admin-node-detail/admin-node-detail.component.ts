import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { filter, map } from 'rxjs/operators';
import { Node, defaultNode } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { ItemType } from 'src/app/models/generic.models';
import { Terminal } from 'xterm';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Component( {
	selector: 'app-admin-node-detail',
	templateUrl: './admin-node-detail.component.html',
	styleUrls: [ './admin-node-detail.component.scss' ]
} )
export class AdminNodeDetailComponent implements OnInit, OnDestroy, AfterViewInit {
	public node: Node = defaultNode();
	public term: Terminal;
	@ViewChild( 'terminal' ) terminal: ElementRef;

	private subs = subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngAfterViewInit() {
		this.term = new Terminal( { cursorBlink: true, scrollback: 60 } );
		this.term.on( 'key', ( key, ev ) => {
			console.log( key.charCodeAt( 0 ) );
			if ( key.charCodeAt( 0 ) === 13 ) this.term.write( '\n' );
			this.term.write( key );
			this.db.doc( '/nodes/' + this.node.id ).update( {
				keypresses: firestore.FieldValue.arrayUnion( { key, date: new Date() } )
			} );
		} );
		this.term.open( this.terminal.nativeElement );
		this.term.clear();
	}

	ngOnInit() {
		this.subs.push( this.ss.cItem$.pipe(
			filter( i => !!i.id ),
			map( i => ( { ...i, type: ItemType.node } as Node ) )
		).subscribe( i => {
			this.node = i;
			this.term.focus();
		} ) );
	}

	ngOnDestroy() { subsDispose( this.subs ); }
}
