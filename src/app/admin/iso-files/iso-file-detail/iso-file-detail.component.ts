import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { map } from 'rxjs/operators';
import { ISOFile } from 'src/app/models/isofile.models';
import { enum2array, SortByName } from 'src/utilities/utilityFunctions';
import { ImageStatus } from 'src/app/models/image.models';
import { StoragePool } from 'src/app/models/storagepool.models';

@Component( {
	selector: 'app-iso-file-detail',
	templateUrl: './iso-file-detail.component.html',
	styleUrls: [ './iso-file-detail.component.scss' ]
} )
export class IsoFileDetailComponent implements OnInit {
	public statuses = enum2array( ImageStatus );

	public item$ = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as ISOFile ) ),
	);

	public pools$ = this.db.collection<StoragePool>( 'storagepools' ).snapshotChanges().pipe(
		map( a => this.us.actions2Data<StoragePool>( a ) ),
		map( a => a.sort( SortByName ) ),
		map( a => a.map( p => ( { ...p, files: Object.values( p.files ).sort( SortByName ) } ) ) )
	);

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
