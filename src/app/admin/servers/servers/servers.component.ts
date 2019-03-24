import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from 'src/app/models/server.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { SortByName } from 'src/utilities/utilityFunctions';
import { map } from 'rxjs/operators';

@Component( {
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: [ './servers.component.scss' ]
} )
export class ServersComponent implements OnInit {
	public items$: Observable<Server[]> = this.db.collection<Server>( 'servers' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<Server>( d ).sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
