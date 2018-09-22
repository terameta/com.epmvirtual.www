import { Component, OnInit, OnDestroy } from '@angular/core';
import { settingsSEODefault } from '../../../../models/settings.seo';
import { SharedService } from '../../../shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../../../models/generic.models';
import { Asset } from '../../../models/asset.models';
import { take } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-settings-seo',
	templateUrl: './admin-settings-seo.component.html',
	styleUrls: [ './admin-settings-seo.component.scss' ]
} )
export class AdminSettingsSeoComponent implements OnInit, OnDestroy {
	public settings = settingsSEODefault();

	public pImages: { logo: string, twitter: string, opengraph: string } = { logo: null, twitter: null, opengraph: null };

	private subs = this.ss.subsCreate();

	constructor(
		public ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.subscribe( this.handleItem ) );
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleItem = ( s: Item ) => {
		this.settings = { ...settingsSEODefault(), ...s };
		if ( this.settings.logo ) this.findLogo( 'logo', this.settings.logo );
		if ( this.settings.twittercardimage ) this.findLogo( 'twitter', this.settings.twittercardimage );
		if ( this.settings.opengraphimage ) this.findLogo( 'opengraph', this.settings.opengraphimage );
	}

	private findLogo = ( setting: string, id: string ) => {
		this.db.doc<Asset>( 'assets/' + id ).snapshotChanges().pipe( take( 1 ) ).subscribe( logo => {
			this.pImages[ setting ] = logo.payload.data().url;
		} );
	}

	public changeLogo = async ( setting: string ) => {
		const newLogo = await this.ss.changeAsset( this.settings[ setting ] || '0' );
		const toSet: any = {};
		toSet[ setting ] = newLogo;
		if ( newLogo ) this.ss.update( toSet );
	}

}
