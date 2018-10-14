import { Component, OnInit, OnDestroy } from '@angular/core';
import { Node, NodeCandidate, NodeCandidateObject } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-nodes',
	templateUrl: './admin-nodes.component.html',
	styleUrls: [ './admin-nodes.component.scss' ]
} )
export class AdminNodesComponent implements OnInit, OnDestroy {
	public items: Node[] = [];
	public itemsReceived = false;
	public candidates: NodeCandidate[] = [];
	public candidatesReceived = false;

	private subs = subsCreate();

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.subs.push( this.db.collection<Node>( '/nodes' ).
			snapshotChanges().
			subscribe( this.handleNodeList )
		);
		this.subs.push( this.db.doc<NodeCandidateObject>( '/nodecandidates/list' ).
			snapshotChanges().
			subscribe( this.handleNodeCandidates )
		);
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleNodeList = ( actions: DocumentChangeAction<Node>[] ) => {
		this.itemsReceived = true;
		this.items = this.us.actions2Data<Node>( actions ).sort( SortByName );
	}

	private handleNodeCandidates = ( action: Action<DocumentSnapshot<NodeCandidateObject>> ) => {
		this.candidatesReceived = true;
		this.candidates = action.payload.data().items;
	}

}
