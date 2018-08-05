import { Component, OnInit } from '@angular/core';
import { SettingsSMTP } from '../../../../models/settings.smtp';
import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-admin-settings-smtp',
	templateUrl: './admin-settings-smtp.component.html',
	styleUrls: [ './admin-settings-smtp.component.scss' ]
} )
export class AdminSettingsSmtpComponent implements OnInit {
	public settings = <SettingsSMTP>{};

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<SettingsSMTP>( 'settings/smtp' ).
			snapshotChanges().
			subscribe( this.initiate );
	}

	private initiate = ( action: Action<DocumentSnapshot<SettingsSMTP>> ) => {
		this.settings = Object.assign( this.settings, action.payload.data() );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		if ( !this.settings.isSecure ) { this.settings.isSecure = false; }
		if ( !this.settings.rejectUnAuthorized ) { this.settings.rejectUnAuthorized = false; }
		this.db.doc( 'settings/smtp' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}
}
