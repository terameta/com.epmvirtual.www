import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from 'src/app/models/server.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName } from 'src/utilities/utilityFunctions';
import { map, tap } from 'rxjs/operators';

@Component( {
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: [ './servers.component.scss' ]
} )
export class ServersComponent implements OnInit {
	public items$ = this.db.collection<Server>( 'servers', ref => ref.orderBy( 'name' ) ).valueChanges( { idField: 'id' } );

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
