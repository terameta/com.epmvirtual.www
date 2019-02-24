import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Image } from 'src/app/models/image.models';
import { SortByName, SortByPosition } from 'src/utilities/utilityFunctions';
import { map, debounceTime } from 'rxjs/operators';
import { ImageGroup } from 'src/app/models/imagegroup.models';
import { StoragePool } from 'src/app/models/storagepool.models';

@Component( {
	selector: 'app-admin-image-list',
	templateUrl: './admin-image-list.component.html',
	styleUrls: [ './admin-image-list.component.scss' ]
} )
export class AdminImageListComponent implements OnInit {
	public images$ = this.db.collection<Image>( 'images' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<Image>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	public igs$ = this.db.collection<ImageGroup>( 'imagegroups' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<ImageGroup>( d ) ),
		map( d => d.sort( SortByPosition ) )
	);

	public pools$ = this.db.collection<StoragePool>( 'storagepools' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<StoragePool>( d ) ),
		map( d => d.sort( SortByPosition ) )
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
			const result = await this.db.collection( 'images' ).add( { name } );
			this.us.navigateByUrl( '/admin/images/' + result.id );
		}
	}

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'images/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}

}
