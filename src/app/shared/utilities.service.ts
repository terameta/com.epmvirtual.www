import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { Item, ItemType } from '../models/generic.models';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable( {
	providedIn: 'root'
} )
export class UtilitiesService {

	constructor(
		private router: Router
	) { }

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
	public navigateByUrl = ( url: string ) => this.router.navigateByUrl( url );

	public deepCopy = ( payload: any ) => JSON.parse( JSON.stringify( payload ) );

	public actions2Data = <T>( actions: DocumentChangeAction<any>[] ): T[] => {
		return actions.map( a => ( { ...a.payload.doc.data(), ...{ id: a.payload.doc.id } } ) );
	}
}
