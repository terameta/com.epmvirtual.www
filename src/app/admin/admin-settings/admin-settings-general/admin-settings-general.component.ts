import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { SettingsGeneral, settingsGeneralDefault } from '../../../../models/settings.general';

@Component( {
	selector: 'app-admin-settings-general',
	templateUrl: './admin-settings-general.component.html',
	styleUrls: [ './admin-settings-general.component.scss' ]
} )
export class AdminSettingsGeneralComponent implements OnInit {
	public settings: SettingsGeneral = settingsGeneralDefault();

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<SettingsGeneral>( 'settings/general' ).
			snapshotChanges().
			subscribe( console.log );
		console.log( this.settings );
	}

	ngOnInit() {
	}

	public save = () => {
		this.db.doc( 'settings/general' ).update( this.settings );
	}

}
