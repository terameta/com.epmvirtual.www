import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';
import { IPBlock } from 'src/app/models/ipblock.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataCenter } from 'src/app/models/datacenter.models';
import { SortByName } from 'src/utilities/utilityFunctions';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-ip-block-detail',
	templateUrl: './ip-block-detail.component.html',
	styleUrls: [ './ip-block-detail.component.scss' ]
} )
export class IpBlockDetailComponent implements OnInit {
	public item$: Observable<IPBlock> = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as IPBlock ) ),
		// map( i => ( { ...i, requirements: i.requirements || {} } ) ),
		map( i => ( ( i as any ) as IPBlock ) )
	);

	public dcs$ = this.db.collection<DataCenter>( 'datacenters' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<DataCenter>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
