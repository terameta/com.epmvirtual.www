import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeModel } from 'angular-tree-component';
import { Subscription } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Document } from '../../../models/library.models';

@Component( {
	selector: 'app-admin-library-sidenav',
	templateUrl: './admin-library-sidenav.component.html',
	styleUrls: [ './admin-library-sidenav.component.scss' ]
} )
export class AdminLibrarySidenavComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	public folderTree: any[] = [];

	public treeModel: TreeModel;
	public treeOptions = {
		animateExpand: true,
		animateSpeed: 10,
		animateAcceleration: 1
	};

	public documents: Document[] = [];

	constructor(
		private db: AngularFirestore
	) {
		this.subscriptions.push( this.db.collection<Document>( 'library', ref => ref.orderBy( 'name', 'asc' ) ).
			snapshotChanges().subscribe( this.initiateAll, this.handleIssues )
		);
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscriptions.forEach( s => s.unsubscribe() );
		this.subscriptions = [];
	}

	private initiateAll = ( result: DocumentChangeAction<Document>[] ) => {
		this.documents = result.map( d => d.payload.doc ).map( d => ( { id: d.id, ...d.data() } ) );

	}

	private handleIssues = ( issue ) => {
		console.error( '===========================================' );
		console.error( '===========================================' );
		console.error( issue );
		console.error( '===========================================' );
		console.error( '===========================================' );
	}

}
