import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImageGroup } from 'src/app/models/imagegroup.models';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName, enum2array } from 'src/utilities/utilityFunctions';
import { StoragePool } from 'src/app/models/storagepool.models';
import { ImageType, ImageStatus, Architecture, DiskDriver, NetDriver, OS, Image } from 'src/app/models/image.models';

@Component( {
	selector: 'app-admin-image-detail',
	templateUrl: './admin-image-detail.component.html',
	styleUrls: [ './admin-image-detail.component.scss' ]
} )
export class AdminImageDetailComponent implements OnInit {
	public imageTypes = enum2array( ImageType );
	public statuses = enum2array( ImageStatus );
	public architectures = enum2array( Architecture );
	public diskDrivers = enum2array( DiskDriver );
	public netDrivers = enum2array( NetDriver );
	public oses = enum2array( OS );

	public item$ = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as Image ) ),
		map( i => ( { ...i, requirements: i.requirements || {} } ) ),
		map( i => ( ( i as any ) as Image ) )
	);

	public groups$ = this.db.collection<ImageGroup>( 'imagegroups' ).
		snapshotChanges().pipe(
			map( a => this.us.actions2Data<ImageGroup>( a ) ),
			map( d => d.sort( SortByName ) )
		);

	public pools$ = this.db.collection<StoragePool>( 'storagepools' ).
		snapshotChanges().
		pipe(
			map( a => this.us.actions2Data<StoragePool>( a ) ),
			map( a => a.sort( SortByName ) ),
			map( a => a.map( p => ( { ...p, files: Object.values( p.files ).sort( SortByName ) } ) ) )
		);

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

}
