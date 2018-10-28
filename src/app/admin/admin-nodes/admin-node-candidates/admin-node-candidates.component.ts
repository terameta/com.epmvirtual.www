import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodeCandidate, NodeCandidateObject, defaultNode } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { firestore } from 'firebase/app';
import { UtilitiesService } from 'src/app/shared/utilities.service';

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
		private db: AngularFirestore,
		private us: UtilitiesService
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
		const response = await this.ss.confirm( 'Are you sure you want to accept node candidate?' );
		if ( response ) {
			await this.db.doc( '/nodes/' + candidate.id ).set( { ...defaultNode(), ...candidate, name: candidate.hostname } ).catch( console.error );
			this.us.navigateByUrl( '/admin/nodes/' + candidate.id );
			this.db.doc( '/nodecandidates/list' ).update( {
				items: firestore.FieldValue.arrayRemove( candidate )
			} );
		}
	}
	public candidateReject = async ( candidate: NodeCandidate ) => {
		const response = await this.ss.confirm( 'Are you sure you want to reject node candidate?' );
		if ( response ) {
			this.db.doc( '/nodecandidates/list' ).update( {
				items: firestore.FieldValue.arrayRemove( candidate )
			} );
		}
	}

}
