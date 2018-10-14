import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeCandidate, NodeCandidateObject } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { firestore } from 'firebase/app';

@Component( {
	selector: 'app-admin-node-candidates',
	templateUrl: './admin-node-candidates.component.html',
	styleUrls: [ './admin-node-candidates.component.scss' ]
} )
export class AdminNodeCandidatesComponent implements OnInit, OnDestroy {
	public candidates: NodeCandidate[] = [];
	public candidatesReceived = false;

	private subs = subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.db.doc<NodeCandidateObject>( '/nodecandidates/list' ).
			snapshotChanges().
			subscribe( this.handleNodeCandidates )
		);
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleNodeCandidates = ( action: Action<DocumentSnapshot<NodeCandidateObject>> ) => {
		this.candidatesReceived = true;
		this.candidates = action.payload.data().items;
	}
	public candidateAccept = async ( candidate: NodeCandidate ) => {
		await this.db.doc( '/nodes/' + candidate.id ).set( { ...candidate, name: candidate.hostname } ).catch( console.error );
		this.db.doc( '/nodecandidates/list' ).update( {
			items: firestore.FieldValue.arrayRemove( candidate )
		} );
	}
	public candidateReject = ( candidate: NodeCandidate ) => {
		this.db.doc( '/nodecandidates/list' ).update( {
			items: firestore.FieldValue.arrayRemove( candidate )
		} );
	}

}
