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

	constructor(
		private db: AngularFirestore,
		private ms: AdminLibraryService,
		private ss: AdminSharedService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.currentIDO.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
	}

	ngOnDestroy() {
		if ( this.documentSubscription ) { this.documentSubscription.unsubscribe(); }
		if ( this.idSubscription ) { this.idSubscription.unsubscribe(); }
		if ( this.childrenSubscription ) { this.childrenSubscription.unsubscribe(); }
	}

	private handleIDChange = ( id: string ) => {
		if ( this.documentSubscription ) { this.documentSubscription.unsubscribe(); }
		this.documentSubscription = this.db.
			doc<Document>( '/library/' + id ).snapshotChanges().
			subscribe( this.handleDocumentChange );
		this.childrenSubscription = this.db.
			collection( '/library', ref => ref.where( 'parent', '==', id ) ).snapshotChanges().
			subscribe( this.handleChildrenChange );
	}

	private handleDocumentChange = ( dAction: Action<DocumentSnapshot<Document>> ) => {
		this.document = dAction.payload.data();
	}

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Document>[] ) => {
		this.children = dChildrenActions.map( c => ( { id: c.payload.doc.id, ...c.payload.doc.data() } ) );
		// this.document = dAction.payload.data();
	}

}
