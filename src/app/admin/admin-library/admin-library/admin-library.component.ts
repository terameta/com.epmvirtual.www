import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Document } from '../../../models/library.models';
import * as _ from 'lodash';
import { SharedService } from '../../../shared/shared.service';
import { ItemType } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library',
	templateUrl: './admin-library.component.html',
	styleUrls: [ './admin-library.component.scss' ]
} )
export class AdminLibraryComponent implements OnInit, OnDestroy {
	private idSubscription: Subscription;
	private docSubscription: Subscription;
	public currentID = '0';

	private docObject: { [ key: string ]: Document } = {};
	public crumbs: Document[] = [];

	public itemType = ItemType;

	constructor(
		private db: AngularFirestore,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.cID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
		this.docSubscription = this.db.
			collection<Document>( '/library' ).
			snapshotChanges().
			subscribe( this.handleDocChange );
	}

	ngOnDestroy() {
		if ( this.idSubscription ) this.idSubscription.unsubscribe();
		this.idSubscription = null;
		if ( this.docSubscription ) this.docSubscription.unsubscribe();
		this.docSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		this.currentID = id;
		this.crumbs = [];
		let cID = id;
		while ( this.docObject[ cID ] ) {
			this.crumbs.unshift( this.docObject[ cID ] );
			cID = this.docObject[ cID ].parent;
		}
	}

	private handleDocChange = ( dDocActions: DocumentChangeAction<Document>[] ) => {
		this.docObject = _.keyBy( dDocActions.map( c => ( { ...c.payload.doc.data(), ...{ id: c.payload.doc.id } } ) ), 'id' );
		this.handleIDChange( this.currentID );
	}

}
