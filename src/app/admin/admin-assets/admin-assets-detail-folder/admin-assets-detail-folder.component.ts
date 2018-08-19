import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot, DocumentChangeAction } from 'angularfire2/firestore';
import { AdminSharedService } from '../../admin-shared-service.service';
import { SharedService } from '../../../shared/shared.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Asset } from '../../../models/asset.models';

@Component( {
	selector: 'app-admin-assets-detail-folder',
	templateUrl: './admin-assets-detail-folder.component.html',
	styleUrls: [ './admin-assets-detail-folder.component.scss' ]
} )
export class AdminAssetsDetailFolderComponent implements OnInit, OnDestroy {
	private assetSubscription: Subscription;
	private idSubscription: Subscription;
	private childrenSubscription: Subscription;

	public asset: Asset;
	public children: Asset[] = [];
	public selectedItems: string[] = [];

	public assetsReceived = false;

	constructor(
		private db: AngularFirestore,
		private ss: AdminSharedService,
		private gss: SharedService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.currentID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
	}

	ngOnDestroy() {
		if ( this.assetSubscription ) this.assetSubscription.unsubscribe();
		this.assetSubscription = null;
		if ( this.idSubscription ) this.idSubscription.unsubscribe();
		this.idSubscription = null;
		if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		this.childrenSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		this.assetsReceived = false;
		this.children = [];
		if ( this.assetSubscription ) this.assetSubscription.unsubscribe();
		this.assetSubscription = this.db.
			doc<Asset>( '/assets/' + id ).snapshotChanges().
			subscribe( this.handleAssetChange );
		if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		this.childrenSubscription = this.db.
			collection( '/assets', ref => ref.where( 'parent', '==', id ) ).
			snapshotChanges().
			subscribe( this.handleChildrenChange );
	}

	private handleAssetChange = ( dAction: Action<DocumentSnapshot<Asset>> ) => {
		this.asset = dAction.payload.data();
	}

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Asset>[] ) => {
		this.assetsReceived = true;
		this.children = dChildrenActions.
			map( c => ( { id: c.payload.doc.id, ...c.payload.doc.data() } ) ).
			map( d => { d.createdOn = ( d.createdOn as any ).toDate(); return d; } );
	}

	public isSelected = ( id: string ) => this.selectedItems.includes( id );

	public setSelected = ( id: string ) => this.selectedItems.push( id );

	public setUnselected = ( id: string ) => {
		this.selectedItems = this.selectedItems.filter( i => i !== id );
	}

	public setAllSelected = () => this.selectedItems = this.children.map( c => c.id );
	public setNoneSelected = () => this.selectedItems = [];

	public rename = async ( id: string, oldName: string ) => {
		const name: string = await this.gss.prompt( 'What is the new name?', oldName );
		if ( name && name !== '' ) this.db.doc<Asset>( '/assets/' + id ).update( { name } );
	}

	public delete = async ( id: string, name: string ) => {
		this.gss.confirm( 'Are you sure you want to delete ' + ( name || id ) ).
			then( console.log ).
			catch( console.error );
	}
}
