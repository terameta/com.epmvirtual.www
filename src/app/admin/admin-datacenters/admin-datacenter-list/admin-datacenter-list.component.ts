import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortByName, SortByPosition } from 'src/utilities/utilityFunctions';
import { DataCenter } from 'src/app/models/datacenter.models';
import { SharedService } from 'src/app/shared/shared.service';

@Component( {
	selector: 'app-admin-datacenter-list',
	templateUrl: './admin-datacenter-list.component.html',
	styleUrls: [ './admin-datacenter-list.component.scss' ]
} )
export class AdminDataCenterListComponent implements OnInit {
	public dcs$: Observable<DataCenter[]>;

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.dcs$ = this.db.collection<DataCenter>( 'datacenters' ).
			snapshotChanges().
			pipe( map( a => this.us.actions2Data<DataCenter>( a ) ), map( d => d.sort( SortByPosition ) ) );
	}

}
