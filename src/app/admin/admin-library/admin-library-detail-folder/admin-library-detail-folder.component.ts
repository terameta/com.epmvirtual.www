import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot, DocumentChangeAction } from 'angularfire2/firestore';
import { AdminLibraryService } from '../admin-library.service';
import { AdminSharedService } from '../../admin-shared-service.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Document } from '../../../models/library.models';

@Component( {
	selector: 'app-admin-library-detail-folder',
	templateUrl: './admin-library-detail-folder.component.html',
	styleUrls: [ './admin-library-detail-folder.component.scss' ]
} )
export class AdminLibraryDetailFolderComponent implements OnInit, OnDestroy {
	private documentSubscription: Subscription;
	private idSubscription: Subscription;
	private childrenSubscription: Subscription;

	public document: Document;
	public children: Document[] = [];
	public selectedItems: string[] = [];

	public docsReceived = false;

	constructor(
		private db: AngularFirestore,
		private ms: AdminLibraryService,
		private ss: AdminSharedService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.currentID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
	}

	ngOnDestroy() {
		if ( this.documentSubscription ) this.documentSubscription.unsubscribe();
		this.documentSubscription = null;
		if ( this.idSubscription ) this.idSubscription.unsubscribe();
		this.idSubscription = null;
		if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		this.childrenSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		this.docsReceived = false;
		if ( this.documentSubscription ) this.documentSubscription.unsubscribe();
		this.documentSubscription = this.db.
			doc<Document>( '/library/' + id ).snapshotChanges().
			subscribe( this.handleDocumentChange );
		if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		this.childrenSubscription = this.db.
			collection( '/library', ref => ref.where( 'parent', '==', id ) ).snapshotChanges().
			subscribe( this.handleChildrenChange );
	}

	private handleDocumentChange = ( dAction: Action<DocumentSnapshot<Document>> ) => {
		this.document = dAction.payload.data();
	}

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Document>[] ) => {
		this.docsReceived = true;
		this.children = dChildrenActions.
			map( c => ( { id: c.payload.doc.id, ...c.payload.doc.data() } ) ).
			map( d => { d.createdOn = ( d.createdOn as any ).toDate(); return d; } );
		// this.document = dAction.payload.data();
	}

	public isSelected = ( id: string ) => {
		return this.selectedItems.findIndex( e => e === id ) >= 0;
	}

	public setSelected = ( id: string ) => {
		this.selectedItems.push( id );
	}

	public setUnselected = ( id: string ) => {
		this.selectedItems = this.selectedItems.filter( i => i !== id );
	}

	public setAllSelected = () => this.selectedItems = this.children.map( item => item.id );
	public setNoneSelected = () => this.selectedItems = [];

}
