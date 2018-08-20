import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Asset } from '../../models/asset.models';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { ItemType } from '../../models/generic.models';

@Injectable( {
	providedIn: 'root'
} )
export class AdminAssetsService {

	constructor(
		private db: AngularFirestore,
		private gss: SharedService
	) {
		this.db.collection<Asset>( 'assets' ).snapshotChanges().subscribe( this.handleDocuments )
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

	public folderNew = ( parentID: string ) => {
		this.gss.prompt( 'What is the new folder name?' ).then( ( folderName: string ) => {
			if ( folderName ) {
				const newAsset = <Asset>{ name: folderName, type: ItemType.folder, parent: parentID };
				this.db.collection( 'assets' ).add( newAsset ).catch( console.error );
			}
		} ).catch( console.log );
	}
}
