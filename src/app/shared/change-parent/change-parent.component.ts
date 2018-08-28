import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/generic.models';
import { SortByPosition } from '../../../utilities/utilityFunctions';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component( {
	selector: 'app-change-parent',
	templateUrl: './change-parent.component.html',
	styleUrls: [ './change-parent.component.scss' ]
} )
export class ChangeParentComponent implements OnInit {
	@Input() items: Item[] = [];
	@Input() selectedParent: string;
	@Input() item: Item = {} as Item;

	private _items: any[];
	public hItems: any[] = [];

	public onClose: Subject<any>;

	constructor( public modalRef: BsModalRef ) { }

	ngOnInit() {
		this.onClose = new Subject();
		this._items = this.items.
			map( i => ( i as any ) ).
			map( i => { i.hName = i.name; return i; } ).
			sort( SortByPosition );
		this.hItems.push( this._items.find( i => i.id === '0' ) );
		this.listChildren();
	}

	public setParent = ( id: string ) => {
		this.selectedParent = id;
		console.log( this.selectedParent );
	}

	public ok = () => {
		this.onClose.next( this.selectedParent );
		this.modalRef.hide();
		this.onClose.complete();
	}

	public cancel = () => {
		this.onClose.next( false );
		this.modalRef.hide();
		this.onClose.complete();
	}

	private listChildren = ( parentID = '0', level = 1 ) => {
		this._items.forEach( i => {
			if ( i.parent === parentID ) {
				for ( let x = 0; x < level; x++ ) {
					i.hName = '-- ' + i.hName;
				}
				this.hItems.push( i );
				const newLevel = level + 1;
				this.listChildren( i.id, newLevel );
			}
		} );
	}

}
