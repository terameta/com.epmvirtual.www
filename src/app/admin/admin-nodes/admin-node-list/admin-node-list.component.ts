import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Node, NodeCandidate, NodeCandidateObject } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-node-list',
	templateUrl: './admin-node-list.component.html',
	styleUrls: [ './admin-node-list.component.scss' ]
} )
export class AdminNodeListComponent implements OnInit, OnDestroy {
	public items: Node[] = [];
	public itemsReceived = false;

	private subs = subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.subs.push( this.db.collection<Node>( '/nodes' ).
			snapshotChanges().
			subscribe( this.handleNodeList )
		);
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleNodeList = ( actions: DocumentChangeAction<Node>[] ) => {
		this.itemsReceived = true;
		this.items = this.us.actions2Data<Node>( actions ).sort( SortByName );
	}
}
