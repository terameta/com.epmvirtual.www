import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';
import { Server, ServerStatus } from 'src/app/models/server.models';
import { switchMap, map, tap, take, filter, startWith } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.models';
import { Image } from 'src/app/models/image.models';
import { Plan } from 'src/app/models/plan.models';
import { DataCenter } from 'src/app/models/datacenter.models';
import { Node } from 'src/app/models/node.models';
import { NgForm } from '@angular/forms';
import { IPBlock } from 'src/app/models/ipblock.models';

@Component( {
	selector: 'app-server-main-information',
	templateUrl: './server-main-information.component.html',
	styleUrls: [ './server-main-information.component.scss' ]
} )
export class ServerMainInformationComponent implements OnInit, OnDestroy {
	public statuses = ServerStatus;
	public id$ = this.ss.cID$;
	public item: Server;
	public item$ = this.ss.cID$.pipe(
		filter( a => !!a ),
		switchMap( id => ( this.db.doc<Server>( `servers/${id}` ) ).snapshotChanges() ),
		map( d => this.us.action2Data<Server>( d ) ),
		tap( s => { if ( !s.status ) s.status = ServerStatus[ 'Pending Create' ]; } ),
		startWith( <Server>{} )
	);

	public itemSub = this.item$.subscribe( i => { this.item = i; } );

	public plans$ = this.db.collection<Plan>( 'plans', ref => ref.orderBy( 'position' ) ).valueChanges( { idField: 'id' } );
	public users$ = this.db.collection<User>( 'users', ref => ref.orderBy( 'displayName' ) ).valueChanges( { idField: 'id' } );
	public images$ = this.db.collection<Image>( 'images', ref => ref.orderBy( 'name' ) ).valueChanges( { idField: 'id' } );
	public dcs$ = this.db.collection<DataCenter>( 'datacenters', ref => ref.orderBy( 'position' ) ).valueChanges( { idField: 'id' } );
	public nodes$ = this.db.collection<Node>( 'nodes' ).valueChanges( { idField: 'id' } );
	public ipblocks$ = this.db.collection<IPBlock>( 'ipblocks' ).valueChanges( { idField: 'id' } );

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService,
		public ss: SharedService,
		private http: HttpClient
	) { }

	ngOnInit() {
		const url = 'https://us-central1-epmvirtual-d8014.cloudfunctions.net/updateUserCollection';
		this.http.get( url ).pipe( take( 1 ) ).subscribe();
	}
	ngOnDestroy() {
		this.itemSub.unsubscribe();
	}

	public applyPlan = ( plan: Plan, f: NgForm ) => {
		this.item.cpu = plan.cpu;
		this.item.bandwidth = plan.bandwidth;
		this.item.ram = plan.ram;
		this.item.hdd = plan.hdd;
		this.item.price = plan.price;
		this.item.plan = plan.id;
	}

	public ipChanged = ( ipblocks: IPBlock[], payload: string ) => {
		if ( payload === 'auto' ) {
			let isFound = false;
			ipblocks.forEach( ( ipblock ) => {
				ipblock.ips.forEach( ( ip ) => {
					if ( !isFound && !ip.assigned ) {
						this.item.ip = ip.ip;
						this.item.mac = ip.mac;
						isFound = true;
					}
				} );
			} );
			if ( !isFound ) {
				alert( 'We couldnt find an available IP address, please check the system' );
			}
		} else {
			ipblocks.forEach( ( ipblock ) => {
				ipblock.ips.forEach( ( ip ) => {
					if ( ip.ip === payload ) {
						this.item.mac = ip.mac;
					}
				} );
			} );
		}
	}

}
