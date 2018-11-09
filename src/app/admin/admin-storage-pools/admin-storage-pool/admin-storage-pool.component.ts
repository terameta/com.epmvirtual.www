import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Observable } from 'rxjs';
import { DataCenter } from 'src/app/models/datacenter.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { SortByPosition } from 'src/utilities/utilityFunctions';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { StoragePool } from 'src/app/models/storagepool.models';

@Component( {
	selector: 'app-admin-storage-pool',
	templateUrl: './admin-storage-pool.component.html',
	styleUrls: [ './admin-storage-pool.component.scss' ]
} )
export class AdminStoragePoolComponent implements OnInit {
	public dcs$: Observable<DataCenter[]>;
	public pool$: Observable<StoragePool>;

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.dcs$ = this.db.collection<DataCenter>( 'datacenters' ).
			snapshotChanges().
			pipe( map( a => this.us.actions2Data<DataCenter>( a ) ), map( d => d.sort( SortByPosition ) ) );
		this.pool$ = this.db.doc<StoragePool>( 'storagepools/' + this.ss.cID$.getValue() ).
			snapshotChanges().
			pipe( map( a => this.us.action2Data<StoragePool>( a ) ) );
	}

	public keyChange = async () => {
		const key: string = await this.ss.prompt( 'What is the new key?' );
		if ( key && key !== '' ) this.db.doc( 'storagepools/' + this.ss.cID$.getValue() ).update( { key } );
	}

}
