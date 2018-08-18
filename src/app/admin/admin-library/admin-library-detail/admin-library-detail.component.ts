import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { AdminSharedService } from '../../admin-shared-service.service';
import { Document } from '../../../models/library.models';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ItemType } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-detail',
	templateUrl: './admin-library-detail.component.html',
	styleUrls: [ './admin-library-detail.component.scss' ]
} )
export class AdminLibraryDetailComponent implements OnInit, OnDestroy {
	private documentSubscription: Subscription;
	private idSubscription: Subscription;

	public itemType = ItemType;
	public documentType: ItemType = ItemType.folder;

	constructor(
		private db: AngularFirestore,
		private ss: AdminSharedService
	) {
		this.idSubscription = this.ss.currentID$.pipe( filter( a => !!a ) ).subscribe( this.handleIDChange );
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if ( this.documentSubscription ) { this.documentSubscription.unsubscribe(); }
		this.documentSubscription = null;
		if ( this.idSubscription ) { this.idSubscription.unsubscribe(); }
		this.idSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		if ( this.documentSubscription ) { this.documentSubscription.unsubscribe(); }
		this.documentSubscription = this.db.
			doc<Document>( '/library/' + id ).
			snapshotChanges().
			subscribe( this.handleDocumentChange );
	}

	private handleDocumentChange = ( dAction: Action<DocumentSnapshot<Document>> ) => {
		this.documentType = dAction.payload.data().type;
	}

}
