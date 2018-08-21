import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Asset } from '../../models/asset.models';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';

@Injectable( {
	providedIn: 'root'
} )
export class AdminAssetsService {

	constructor(
		private db: AngularFirestore
	) {
		this.db.collection<Asset>( 'assets' ).snapshotChanges().subscribe( this.handleDocuments );
	}

	private handleDocuments = ( assets: DocumentChangeAction<Asset>[] ) => {
		assets.forEach( ( a ) => {
			const curAsset = { id: a.payload.doc.id, ...a.payload.doc.data() };
			if ( !curAsset.parent && curAsset.id !== '0' ) {
				this.db.doc( '/assets/' + curAsset.id ).update( { parent: '0' } );
			} else if ( !curAsset.createdOn ) {
				this.db.doc( '/assets/' + curAsset.id ).update( { createdOn: ( new Date() ) } );
			}
		} );
	}
}
