import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { settingsTwitterDefault, SettingsTwitter } from '../../../../models/settings.twitter';
import { AngularFirestore } from 'angularfire2/firestore';
import { Item } from '../../../models/generic.models';
import { take } from 'rxjs/operators';
import { Asset } from '../../../models/asset.models';

@Component( {
	selector: 'app-admin-settings-twitter',
	templateUrl: './admin-settings-twitter.component.html',
	styleUrls: [ './admin-settings-twitter.component.scss' ]
} )
export class AdminSettingsTwitterComponent implements OnInit, OnDestroy {
	public settings = settingsTwitterDefault();
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

	public changeLogo = async () => {
		const newLogo = await this.ss.changeAsset( this.settings.logo || '0' );
		if ( newLogo ) this.ss.update( { id: this.settings.id, logo: newLogo } );
	}

	private handleItem = ( s: Item ) => {
		this.settings = { ...settingsTwitterDefault(), ...s };
		if ( this.settings.logo ) this.findLogo();
	}

	private findLogo = () => {
		this.db.doc<Asset>( 'assets/' + this.settings.logo ).snapshotChanges().pipe( take( 1 ) ).subscribe( logo => {
			this.logoUrl = logo.payload.data().url;
		} );
	}

}
