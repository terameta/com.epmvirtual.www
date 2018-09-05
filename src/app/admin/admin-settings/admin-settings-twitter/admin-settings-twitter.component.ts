import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { settingsTwitterDefault, SettingsTwitter } from '../../../../models/settings.twitter';

@Component( {
	selector: 'app-admin-settings-twitter',
	templateUrl: './admin-settings-twitter.component.html',
	styleUrls: [ './admin-settings-twitter.component.scss' ]
} )
export class AdminSettingsTwitterComponent implements OnInit {
	public settings = settingsTwitterDefault();

	constructor( public ss: SharedService ) { }

	ngOnInit() {
		this.ss.cItem$.subscribe( i => ( this.settings = { ...settingsTwitterDefault(), ...i } ) );
	}

	public changeLogo = async () => {
		console.log( await this.ss.changeAsset( '0' ) );
	}

}
