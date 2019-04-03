import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { Server, ServerStatus } from 'src/app/models/server.models';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Component( {
	selector: 'app-server-main-information',
	templateUrl: './server-main-information.component.html',
	styleUrls: [ './server-main-information.component.scss' ]
} )
export class ServerMainInformationComponent implements OnInit {
	public statuses = ServerStatus;
	public id$ = this.ss.cID$;
	public item$: Observable<Server> = this.ss.cID$.pipe(
		switchMap( id => ( this.db.doc<Server>( `servers/${id}` ) ).snapshotChanges() ),
		map( d => this.us.action2Data<Server>( d ) ),
		tap( s => { if ( !s.status ) s.status = ServerStatus[ 'Pending Create' ]; } )
	);

	constructor(
		private db: AngularFirestore,
		private auth: AngularFireAuth,
		private us: UtilitiesService,
		public ss: SharedService,
		private http: HttpClient
	) { }

	ngOnInit() {
		const url = 'https://us-central1-epmvirtual-d8014.cloudfunctions.net/updateUserCollection';
		this.http.get( url ).subscribe( console.log );
	}

}
