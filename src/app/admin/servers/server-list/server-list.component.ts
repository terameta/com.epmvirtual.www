import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Server } from 'src/app/models/server.models';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-server-list',
	templateUrl: './server-list.component.html',
	styleUrls: [ './server-list.component.scss' ]
} )
export class ServerListComponent implements OnInit {
	public items$ = this.db.collection<Server>( 'servers', ref => ref.orderBy( 'name' ) ).valueChanges( { idField: 'id' } );

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

	public create = async () => {
		const name = await this.ss.prompt( 'Name?', 'New Item' );
		if ( name ) {
			const result = await this.db.collection( 'servers' ).add( { name } );
			this.us.navigateByUrl( '/admin/servers/' + result.id );
		}
	}

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'servers/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}

}
