import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Asset } from '../../../models/asset.models';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { AdminSharedService } from '../../admin-shared-service.service';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../../shared/shared.service';
import { ItemType } from '../../../models/generic.models';
import { AdminAssetsService } from '../admin-assets.service';

@Component( {
	selector: 'app-admin-assets',
	templateUrl: './admin-assets.component.html',
	styleUrls: [ './admin-assets.component.scss' ]
} )
export class AdminAssetsComponent implements OnInit, OnDestroy {
	private idSubscription: Subscription;
	private assetSubscription: Subscription;
	public currentID = '0';

	private assetObject: { [ key: string ]: Asset } = {};
	public crumbs: Asset[] = [ <Asset>{ name: 'Assets Home' } ];

	constructor(
		private db: AngularFirestore,
		private ss: AdminSharedService,
		private gss: SharedService,
		private ms: AdminAssetsService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.currentID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
		this.assetSubscription = this.db.
			collection<Asset>( '/assets' ).
			snapshotChanges().
			subscribe( this.handleAssetChange );
	}

	ngOnDestroy() {
		if ( this.idSubscription ) this.idSubscription.unsubscribe();
		this.idSubscription = null;
		if ( this.assetSubscription ) this.assetSubscription.unsubscribe();
		this.assetSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		this.currentID = id;
		this.crumbs = [];
		let cID = id;
		while ( this.assetObject[ cID ] ) {
			this.crumbs.unshift( this.assetObject[ cID ] );
			cID = this.assetObject[ cID ].parent;
		}
	}

	private handleAssetChange = ( dAssetActions: DocumentChangeAction<Asset>[] ) => {
		this.assetObject = _.keyBy( dAssetActions.map( c => ( { id: c.payload.doc.id, ...c.payload.doc.data() } ) ), 'id' );
		this.handleIDChange( this.currentID );
	}

}
