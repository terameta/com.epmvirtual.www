import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { SettingsGeneral, settingsGeneralDefault } from '../../../../models/settings.general';
import { Observable } from '../../../../../node_modules/rxjs';

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
			valueChanges().
			subscribe( payload => this.settings = Object.assign( this.settings, payload ) );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/general' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}

}
