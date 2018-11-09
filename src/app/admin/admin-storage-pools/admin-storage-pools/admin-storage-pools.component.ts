import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';
import { SharedService } from 'src/app/shared/shared.service';
import { StoragePool } from 'src/app/models/storagepool.models';

@Component( {
	selector: 'app-admin-storage-pools',
	templateUrl: './admin-storage-pools.component.html',
	styleUrls: [ './admin-storage-pools.component.scss' ]
} )
export class AdminStoragePoolsComponent implements OnInit {
	public pools$: Observable<StoragePool[]>;

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.pools$ = this.db.collection<StoragePool>( 'storagepools' ).
			snapshotChanges().
			pipe( map( d => this.us.actions2Data<StoragePool>( d ) ), map( d => d.sort( SortByName ) ) );
	}

}
