import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodeCandidateObject, Node } from 'src/app/models/node.models';

@Component( {
	selector: 'app-admin-nodes',
	templateUrl: './admin-nodes.component.html',
	styleUrls: [ './admin-nodes.component.scss' ]
} )
export class AdminNodesComponent implements OnInit {

	public candidates$: Observable<NodeCandidateObject> = this.db.doc<NodeCandidateObject>( 'nodecandidates/list' ).
		snapshotChanges().
		pipe( map( a => this.us.action2Data<NodeCandidateObject>( a ) ) );
	public nodes$: Observable<Node[]> = this.db.collection<Node>( 'nodes' ).
		snapshotChanges().
		pipe( map( a => this.us.actions2Data<Node>( a ) ) );

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

}
