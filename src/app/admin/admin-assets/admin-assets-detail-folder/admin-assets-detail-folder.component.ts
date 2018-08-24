import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot, DocumentChangeAction } from 'angularfire2/firestore';
import { SharedService } from '../../../shared/shared.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Asset } from '../../../models/asset.models';
import { ItemType } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-assets-detail-folder',
	templateUrl: './admin-assets-detail-folder.component.html',
	styleUrls: [ './admin-assets-detail-folder.component.scss' ]
} )
export class AdminAssetsDetailFolderComponent implements OnInit, OnDestroy {
	private assetSubscription: Subscription;
	private idSubscription: Subscription;
	private childrenSubscription: Subscription;

	public itemType = ItemType;

	public asset: Asset;
	public children: Asset[] = [];

	public assetsReceived = false;

	constructor(
		private db: AngularFirestore,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.idSubscription = this.ss.cID$.
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
			collection( 'assets', ref => ref.where( 'parent', '==', id ).orderBy( 'type', 'asc' ).orderBy( 'name', 'asc' ) ).
			snapshotChanges().
			subscribe( this.handleChildrenChange );
	}

	private handleAssetChange = ( dAction: Action<DocumentSnapshot<Asset>> ) => {
		this.asset = dAction.payload.data();
	}

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Asset>[] ) => {
		this.assetsReceived = true;
		this.children = dChildrenActions.
			map( c => ( { ...c.payload.doc.data(), ...{ id: c.payload.doc.id } } ) ).
			map( d => {
				d.createdOn = d.createdOn ? ( d.createdOn as any ).toDate() : new Date();
				return d;
			} );
	}

	public isSelected = ( id: string ) => this.ss.selectedItems.includes( id );

	public setSelected = ( id: string ) => this.ss.selectedItems.push( id );

	public setUnselected = ( id: string ) => {
		this.ss.selectedItems = this.ss.selectedItems.filter( i => i !== id );
	}

	public setAllSelected = () => this.ss.selectedItems = this.children.map( c => c.id );
	public setNoneSelected = () => this.ss.selectedItems = [];

	public rename = async ( id: string, oldName: string ) => {
		const name: string = await this.ss.prompt( 'What is the new name?', oldName );
		if ( name && name !== '' ) this.db.doc<Asset>( '/assets/' + id ).update( { name } );
	}

	public delete = async ( id: string, name: string ) => {
		this.ss.confirm( 'Are you sure you want to delete ' + ( name || id ) ).
			then( console.log ).
			catch( console.error );
	}
}
