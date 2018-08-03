import { Component, OnInit } from '@angular/core';
import { SettingsPayPal } from '../../../../models/settings.paypal';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

@Component( {
	selector: 'app-admin-settings-paypal',
	templateUrl: './admin-settings-paypal.component.html',
	styleUrls: [ './admin-settings-paypal.component.scss' ]
} )
export class AdminSettingsPaypalComponent implements OnInit {
	public settings = <SettingsPayPal>{};

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<SettingsPayPal>( 'settings/paypal' ).
			valueChanges().
			subscribe( payload => this.settings = Object.assign( this.settings, payload ) );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/paypal' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}

}
