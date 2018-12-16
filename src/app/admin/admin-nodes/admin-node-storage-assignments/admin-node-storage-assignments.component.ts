import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, defaultNode } from 'src/app/models/node.models';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { switchMap, map } from 'rxjs/operators';
import { StoragePool } from 'src/app/models/storagepool.models';

@Component( {
	selector: 'app-admin-node-storage-assignments',
	templateUrl: './admin-node-storage-assignments.component.html',
	styleUrls: [ './admin-node-storage-assignments.component.scss' ]
} )
export class AdminNodeStorageAssignmentsComponent implements OnInit {

	public node$: Observable<Node> = this.ss.cID$.pipe(
		switchMap( id => this.db.doc<Node>( 'nodes/' + id ).snapshotChanges() ),
		map( a => this.us.action2Data<Node>( a ) ),
		map( n => this.us.assignOver<Node>( defaultNode(), n ) )
	);

	public pools$: Observable<StoragePool[]> = this.db.collection<StoragePool>( 'storagepools' ).
		snapshotChanges().pipe(
			map( a => this.us.actions2Data<StoragePool>( a ) )
		);

	constructor(
		public ss: SharedService,
		public db: AngularFirestore,
		public us: UtilitiesService
	) { }

	ngOnInit() { }

}
