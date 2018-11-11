import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';
import { Node, defaultNode } from 'src/app/models/node.models';
import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { NgForm } from '@angular/forms';
import { StoragePool } from 'src/app/models/storagepool.models';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-node-detail',
	templateUrl: './admin-node-detail.component.html',
	styleUrls: [ './admin-node-detail.component.scss' ]
} )
export class AdminNodeDetailComponent implements OnInit, OnDestroy {
	// public node: Node = defaultNode();
	public node$: Observable<Node>;
	public pools$: Observable<StoragePool[]>;

	private subs = subsCreate();

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.node$ = this.db.doc<Node>( 'nodes/' + this.ss.cID$.getValue() ).
			snapshotChanges().pipe( map( a => ( { ...defaultNode(), ...this.us.action2Data<Node>( a ) } ) ) );
		this.pools$ = this.db.collection<StoragePool>( 'storagepools' ).
			snapshotChanges().pipe( map( a => this.us.actions2Data<StoragePool>( a ).sort( SortByName ) ) );
		// this.subs.push( this.ss.cItem$.pipe(
		// 	filter( i => !!i.id ),
		// 	map( i => ( { ...i, type: ItemType.node } as Node ) )
		// ).subscribe( i => {
		// 	this.node = i;
		// } ) );
	}

	public save = ( f: NgForm ) => {
		console.log( f.form.controls );
	}

	ngOnDestroy() { subsDispose( this.subs ); }
}
