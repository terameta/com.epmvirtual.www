import { Component, OnInit, OnDestroy } from '@angular/core';
import { Folder, getDefaultItem } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, take } from 'rxjs/operators';
import { Asset } from '../../../models/asset.models';

@Component( {
	selector: 'app-admin-library-detail-folder-seo',
	templateUrl: './admin-library-detail-folder-seo.component.html',
	styleUrls: [ './admin-library-detail-folder-seo.component.scss' ]
} )
export class AdminLibraryDetailFolderSeoComponent implements OnInit, OnDestroy {
	public item: Folder = <Folder>getDefaultItem();
	public pImages: { twitter: string, opengraph: string } = { twitter: null, opengraph: null };

	private subs = this.ss.subsCreate();

	constructor( public ss: SharedService, private db: AngularFirestore ) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.
			pipe(
				filter( i => i.id !== '' ),
				map( i => ( <Folder>i ) ) ).
			subscribe( this.handleItem ) );
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleItem = ( i: Folder ) => {
		this.item = { ...getDefaultItem(), ...i };
		if ( this.item.twitterImage ) this.findLogo( 'twitter', this.item.twitterImage );
		if ( this.item.openGraphImage ) this.findLogo( 'opengraph', this.item.openGraphImage );
	}

	private findLogo = ( logotype: string, id: string ) => {
		this.db.doc<Asset>( 'assets/' + id ).snapshotChanges().pipe( take( 1 ) ).subscribe( logo => {
			this.pImages[ logotype ] = logo.payload.data().url;
		} );
	}

	public changeLogo = async ( logo: string ) => {
		const newLogo = await this.ss.changeAsset( this.item[ logo ] || '0' );
		const toSet: any = {};
		toSet[ logo ] = newLogo;
		if ( newLogo ) this.ss.update( toSet );
	}

}
