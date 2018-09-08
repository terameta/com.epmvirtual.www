import { Component, OnInit, OnDestroy } from '@angular/core';
import { settingsSEODefault } from '../../../../models/settings.seo';
import { SharedService } from '../../../shared/shared.service';
import { AngularFirestore } from 'angularfire2/firestore';
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
	public logoUrl: string = null;

	private subs = this.ss.getsubs();

	constructor(
		public ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.subscribe( this.handleItem ) );
	}

	ngOnDestroy() { this.ss.unsub( this.subs ); }

	private handleItem = ( s: Item ) => {
		this.settings = { ...settingsSEODefault(), ...s };
		if ( this.settings.logo ) this.findLogo();
	}

	private findLogo = () => {
		this.db.doc<Asset>( 'assets/' + this.settings.logo ).snapshotChanges().pipe( take( 1 ) ).subscribe( logo => {
			this.logoUrl = logo.payload.data().url;
		} );
	}

	public changeLogo = async () => {
		const newLogo = await this.ss.changeAsset( this.settings.logo || '0' );
		if ( newLogo ) this.ss.update( { id: this.settings.id, logo: newLogo } );
	}

}
