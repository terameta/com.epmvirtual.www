import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { ISOFile } from 'src/app/models/isofile.models';
import { map } from 'rxjs/operators';
import { SortByName, SortByPosition } from 'src/utilities/utilityFunctions';
import { StoragePool } from 'src/app/models/storagepool.models';
import { ImageStatus } from 'src/app/models/image.models';

@Component( {
	selector: 'app-iso-file-list',
	templateUrl: './iso-file-list.component.html',
	styleUrls: [ './iso-file-list.component.scss' ]
} )
export class IsoFileListComponent implements OnInit {
	public statuses = ImageStatus;

	public items$ = this.db.collection<ISOFile>( 'isofiles' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<ISOFile>( d ).sort( SortByName ) )
	);

	public pools$ = this.db.collection<StoragePool>( 'storagepools' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<StoragePool>( d ).sort( SortByPosition ) )
	);

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

	public create = async () => {
		const name = await this.ss.prompt( 'Name?', 'New Item' );
		if ( name ) {
			const result = await this.db.collection( 'isofiles' ).add( { name } );
			this.us.navigateByUrl( '/admin/isofiles/' + result.id );
		}
	}

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'isofiles/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}

}
