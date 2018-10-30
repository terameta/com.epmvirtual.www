import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { SortByName } from 'src/utilities/utilityFunctions';
import { SharedService } from 'src/app/shared/shared.service';

@Component( {
	selector: 'app-admin-datacenters',
	templateUrl: './admin-datacenters.component.html',
	styleUrls: [ './admin-datacenters.component.scss' ]
} )
export class AdminDataCentersComponent implements OnInit {
	public dcs$: Observable<any>;

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.dcs$ = this.db.collection( 'datacenters' ).
			snapshotChanges().
			pipe( map( this.us.actions2Data ), map( d => d.sort( SortByName ) ) );
	}

}
