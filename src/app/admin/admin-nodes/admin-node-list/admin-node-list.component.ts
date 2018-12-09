import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Node, NodeCandidateObject } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName } from 'src/utilities/utilityFunctions';
import { map } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-node-list',
	templateUrl: './admin-node-list.component.html',
	styleUrls: [ './admin-node-list.component.scss' ]
} )
export class AdminNodeListComponent implements OnInit, OnDestroy {
	public candidates$ = this.db.doc<NodeCandidateObject>( 'nodecandidates/list' ).snapshotChanges().pipe( map( this.us.action2Data ) );
	public nodes$ = this.db.collection<Node>( 'nodes' ).snapshotChanges().pipe( map( this.us.actions2Data ) );

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

	ngOnDestroy() { }

	public nodeDelete = async ( id: string, name: string ) => {
		const response = await this.ss.confirm( 'Are you sure you want to delete ' + ( name ? name : 'node with id' + id ) + '?' );
		if ( response ) {
			this.db.doc( '/nodes/' + id ).delete().catch( console.error );
		}
	}
}
