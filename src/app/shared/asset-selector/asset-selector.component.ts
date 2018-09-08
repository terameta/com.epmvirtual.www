import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Asset, getDefaultAsset } from '../../models/asset.models';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SortByPosition } from '../../../utilities/utilityFunctions';
import { ItemType } from '../../models/generic.models';

@Component( {
	selector: 'app-asset-selector',
	templateUrl: './asset-selector.component.html',
	styleUrls: [ './asset-selector.component.scss' ]
} )
export class AssetSelectorComponent implements OnInit, OnDestroy {
	@Input() items: Asset[] = [];
	@Input() selectedAsset: string;
	@Input() item = getDefaultAsset();

	private _items: any[];
	public hItems: any[] = [];
	public currentParent = '0';

	public itemTypes = ItemType;

	public onClose: Subject<any>;

	constructor( public modalRef: BsModalRef ) { }

	ngOnInit() {
		this.onClose = new Subject();
		this._items = this.items.map( i => ( { ...i, ...{ hName: i.name } } ) ).sort( SortByPosition );
		this._items.forEach( i => { if ( i.id === this.selectedAsset ) this.currentParent = i.parent; } );
		this.hItems.push( this._items.find( i => i.id === '0' ) );
		this.listChildren();
	}

	ngOnDestroy() {
		this.cancel();
	}

	private listChildren = ( parentID = '0', level = 1 ) => {
		this._items.forEach( i => {
			if ( i.parent === parentID && i.type === ItemType.folder ) {
				for ( let x = 0; x < level; x++ ) {
					i.hName = '-- ' + i.hName;
				}
				this.hItems.push( i );
				const newLevel = level + 1;
				this.listChildren( i.id, newLevel );
			}
		} );
	}

	public isImage = ( t: string ) => ( t.substr( 0, 5 ) === 'image' );

	public setThis = ( t: string ) => {
		this.selectedAsset = t;
		this.ok();
	}

	public ok = () => {
		this.onClose.next( this.selectedAsset );
		this.modalRef.hide();
		this.onClose.complete();
	}

	public cancel = () => {
		this.onClose.next( false );
		this.modalRef.hide();
		this.onClose.complete();
	}

}
