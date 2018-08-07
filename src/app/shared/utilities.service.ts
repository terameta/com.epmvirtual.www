import { Injectable } from '@angular/core';
import { Item, ItemType } from '../models/generic.models';
import { TreeNode } from 'angular-tree-component';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable( {
	providedIn: 'root'
} )
export class UtilitiesService {

	constructor(
		private router: Router
	) { }

	public buildTree = ( sourceItems: Item[], onlyFolder = true ) => {
		const items: Item[] = this.deepCopy( sourceItems );
		const tree: TreeNode[] = items.
			filter( i => ( onlyFolder ? i.type === ItemType.folder : true ) ).
			filter( i => !i.parent ).
			map( this.item2treeItem );
		tree.forEach( item => this.buildTreeAction( item, items ) );
		return tree;
	}

	private buildTreeAction = ( currentParent: TreeNode, items: Item[] ) => {
		currentParent.children = items.
			filter( i => i.parent === currentParent.id ).
			map( this.item2treeItem );
		currentParent.children.forEach( item => this.buildTreeAction( item, items ) );
	}

	public item2treeItem = ( item: Item ): TreeNode => {
		const toReturn: any = {
			id: item.id,
			name: item.name,
			isFolder: ( item.type === ItemType.folder ),
			isExpanded: ( item.id === '0' )
		};
		return toReturn;
	}

	public findAncestors = ( sourceItems: any[], activeItemID: string ) => {
		const allItems = _.keyBy( sourceItems, 'id' );
		const toReturn: { [ id: string ]: boolean } = {};
		while ( activeItemID ) {
			toReturn[ activeItemID ] = true;
			if ( allItems[ activeItemID ] ) {
				activeItemID = allItems[ activeItemID ].parent;
			} else {
				activeItemID = null;
			}
		}
		return toReturn;
	}

	public navigateTo = ( section: string, id: string ) => {
		this.router.navigateByUrl( '/' + section + '/' + id );
	}

	public deepCopy = ( payload: any ) => JSON.parse( JSON.stringify( payload ) );
}
