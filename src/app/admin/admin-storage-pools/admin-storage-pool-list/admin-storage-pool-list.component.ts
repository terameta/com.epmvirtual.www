import { Component, OnInit } from '@angular/core';
import { StoragePool } from 'src/app/models/storagepool.models';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';
import { SharedService } from 'src/app/shared/shared.service';

@Component( {
	selector: 'app-admin-storage-pool-list',
	templateUrl: './admin-storage-pool-list.component.html',
	styleUrls: [ './admin-storage-pool-list.component.scss' ]
} )
export class AdminStoragePoolListComponent implements OnInit {
	public pools$: Observable<StoragePool[]>;

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.pools$ = this.db.collection<StoragePool>( 'storagepools' ).
			snapshotChanges().
			pipe( map( a => this.us.actions2Data<StoragePool>( a ) ), map( a => a.sort( SortByName ) ) );
	}

}
