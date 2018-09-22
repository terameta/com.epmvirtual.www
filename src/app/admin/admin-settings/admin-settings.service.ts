import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable( {
	providedIn: 'root'
} )
export class AdminSettingsService {

	constructor( private db: AngularFirestore ) { }

	public counterIncrement = ( name: string, increment: number ) => {
		const sfDocRef = this.db.firestore.doc( 'settings/general' );

		return this.db.firestore.runTransaction( ( transaction ) => {
			return transaction.get( sfDocRef ).then( ( sfDoc ) => {
				if ( !sfDoc.exists ) {
					throw new Error( 'Document does not exist!' );
				}
				const counters = sfDoc.data().counters;
				let newCounterValue = 0;
				counters.forEach( counter => {
					if ( counter.name === name ) {
						counter.value = parseInt( counter.value, 10 ) + increment;
						newCounterValue = counter.value;
					}
				} );

				transaction.update( sfDocRef, { counters } );
				return Promise.resolve( newCounterValue );
			} );
		} );
	}
}
