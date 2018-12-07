import { Component, OnInit, OnDestroy } from '@angular/core';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodeCandidateObject, Node } from 'src/app/models/node.models';

@Component( {
	selector: 'app-admin-nodes',
	templateUrl: './admin-nodes.component.html',
	styleUrls: [ './admin-nodes.component.scss' ]
} )
export class AdminNodesComponent implements OnInit {
	// public items: Node[] = [];
	// public itemsReceived = false;
	// public candidates: NodeCandidate[] = [];
	// public candidatesReceived = false;

	// private subs = subsCreate();

	public candidates$ = this.db.doc<NodeCandidateObject>( 'nodecandidates/list' ).snapshotChanges().pipe( map( this.us.action2Data ) );
	public nodes$ = this.db.collection<Node>( 'nodes' ).snapshotChanges().pipe( map( this.us.actions2Data ) );

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		// this.subs.push( this.db.collection<Node>( '/nodes' ).
		// 	snapshotChanges().
		// 	subscribe( this.handleNodeList )
		// );
		// this.subs.push( this.db.doc<NodeCandidateObject>( '/nodecandidates/list' ).
		// 	snapshotChanges().
		// 	subscribe( this.handleNodeCandidates )
		// );
	}

	// private handleNodeList = ( actions: DocumentChangeAction<Node>[] ) => {
	// 	this.itemsReceived = true;
	// 	this.items = this.us.actions2Data<Node>( actions ).sort( SortByName );
	// }

	// private handleNodeCandidates = ( action: Action<DocumentSnapshot<NodeCandidateObject>> ) => {
	// 	this.candidatesReceived = true;
	// 	this.candidates = action.payload.data().items;
	// }

}
