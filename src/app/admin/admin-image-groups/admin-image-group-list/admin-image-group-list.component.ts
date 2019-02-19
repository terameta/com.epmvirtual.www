import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { ImageGroup, ImageGroupType } from 'src/app/models/imagegroup.models';
import { map, tap, debounceTime } from 'rxjs/operators';
import { SortByPosition } from 'src/utilities/utilityFunctions';
import { SharedService } from 'src/app/shared/shared.service';

@Component( {
	selector: 'app-admin-image-group-list',
	templateUrl: './admin-image-group-list.component.html',
	styleUrls: [ './admin-image-group-list.component.scss' ]
} )
export class AdminImageGroupListComponent implements OnInit {
	public igTypes = ImageGroupType;
	public igs$ = this.db.collection<ImageGroup>( 'imagegroups' ).
		snapshotChanges().pipe(
			map( d => this.us.actions2Data<ImageGroup>( d ) ),
			debounceTime( 300 ),
			map( d => d.sort( SortByPosition ) ),
			tap( d => d.forEach( ( e, ei ) => {
				if ( e.position !== ei ) this.db.doc( 'imagegroups/' + e.id ).update( { position: ei } );
			} ) )
		);


	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		private ss: SharedService
	) { }

	ngOnInit() { }

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'imagegroups/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}

	public create = async () => {
		const name = await this.ss.prompt( 'Name?', 'New Item' );
		if ( name ) {
			const result = await this.db.collection( 'imagegroups' ).add( { name, type: ImageGroupType.Private } );
			this.us.navigateByUrl( '/admin/imagegroups/' + result.id );
		}
	}

	public move = async ( group: ImageGroup, groups: ImageGroup[], direction: number ) => {
		groups.forEach( g => {
			g.position = g.position * 10;
			if ( g.id === group.id ) g.position += 11 * direction;
		} );
		groups.sort( SortByPosition );
		groups.forEach( ( g, position ) => {
			g.position = g.position / 10;
			if ( g.position !== position ) {
				g.position = position;
				this.db.doc( 'imagegroups/' + g.id ).update( { position } );
			}
		} );
	}

}
