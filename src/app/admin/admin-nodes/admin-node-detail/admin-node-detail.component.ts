import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { map, switchMap } from 'rxjs/operators';
import { Node } from 'src/app/models/node.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { DataCenter } from 'src/app/models/datacenter.models';

@Component( {
	selector: 'app-admin-node-detail',
	templateUrl: './admin-node-detail.component.html',
	styleUrls: [ './admin-node-detail.component.scss' ]
} )
export class AdminNodeDetailComponent implements OnInit {
	public dcs$ = this.db.collection( 'datacenters' ).snapshotChanges().pipe( map( d => this.us.actions2Data<DataCenter>( d ) ) );

	public node$: Observable<Node> = this.ss.cID$.pipe(
		switchMap( id => this.db.doc<Node>( 'nodes/' + id ).snapshotChanges() ),
		map( a => this.us.action2Data<Node>( a ) )
	);
	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

}
