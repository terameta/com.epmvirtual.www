import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Server } from 'src/app/models/server.models';
import { SharedService } from 'src/app/shared/shared.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-server-detail',
	templateUrl: './server-detail.component.html',
	styleUrls: [ './server-detail.component.scss' ]
} )
export class ServerDetailComponent implements OnInit {
	// public item$ = this.db.doc<Server>('servers/')
	public id$ = this.ss.cID$;
	public item$: Observable<Server> = this.ss.cID$.pipe(
		switchMap( id => ( this.db.doc<Server>( `servers/${id}` ) ).snapshotChanges() ),
		map( d => this.us.action2Data<Server>( d ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		private ss: SharedService
	) { }

	ngOnInit() {
	}

}
