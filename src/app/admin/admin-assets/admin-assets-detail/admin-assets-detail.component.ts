import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemType } from '../../../models/generic.models';
import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { AdminSharedService } from '../../admin-shared-service.service';
import { Asset } from '../../../models/asset.models';
import { filter } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-assets-detail',
	templateUrl: './admin-assets-detail.component.html',
	styleUrls: [ './admin-assets-detail.component.scss' ]
} )
export class AdminAssetsDetailComponent implements OnInit, OnDestroy {
	private idSubscription: Subscription;
	private assetSubscription: Subscription;

	public itemType = ItemType;
	public assetType: ItemType = ItemType.folder;

	constructor(
		private db: AngularFirestore,
		private ss: AdminSharedService
	) {
		this.idSubscription = this.ss.currentID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if ( this.assetSubscription ) this.assetSubscription.unsubscribe();
		this.assetSubscription = null;
		if ( this.idSubscription ) this.idSubscription.unsubscribe();
		this.idSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		if ( this.assetSubscription ) this.assetSubscription.unsubscribe();
		this.assetSubscription = this.db.
			doc<Asset>( '/assets/' + id ).
			snapshotChanges().
			subscribe( this.handleAssetChange );
	}

	private handleAssetChange = ( dAction: Action<DocumentSnapshot<Asset>> ) => {
		this.assetType = dAction.payload.data().type;
	}

}
