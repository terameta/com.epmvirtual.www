import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { Server, ServerStatus } from 'src/app/models/server.models';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.models';
import { Image } from 'src/app/models/image.models';
import { Plan } from 'src/app/models/plan.models';
import { DataCenter } from 'src/app/models/datacenter.models';
import { Node } from 'src/app/models/node.models';

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

	public users$ = this.db.collection( 'users' ).snapshotChanges().pipe( map( d => this.us.actions2Data<User>( d ) ) );
	public images$ = this.db.collection( 'images' ).snapshotChanges().pipe( map( d => this.us.actions2Data<Image>( d ) ) );
	public plans$ = this.db.collection( 'plans' ).snapshotChanges().pipe( map( d => this.us.actions2Data<Plan>( d ) ), map( d => [ ( { id: '0', name: 'Custom' } as Plan ), ...d ] ) );
	public dcs$ = this.db.collection( 'datacenters' ).snapshotChanges().pipe( map( d => this.us.actions2Data<DataCenter>( d ) ) );
	public nodes$ = this.db.collection( 'nodes' ).snapshotChanges().pipe( map( d => this.us.actions2Data<Node>( d ) ) );

	constructor(
		private db: AngularFirestore,
		private auth: AngularFireAuth,
		private us: UtilitiesService,
		public ss: SharedService,
		private http: HttpClient
	) { }

	ngOnInit() {
		const url = 'https://us-central1-epmvirtual-d8014.cloudfunctions.net/updateUserCollection';
		this.http.get( url ).pipe( take( 1 ) ).subscribe();
	}

}
