import { Component, OnInit } from '@angular/core';
import { SettingsPayPal } from '../../../../models/settings.paypal';
import { NgForm } from '@angular/forms';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';

@Component( {
	selector: 'app-admin-settings-paypal',
	templateUrl: './admin-settings-paypal.component.html',
	styleUrls: [ './admin-settings-paypal.component.scss' ]
} )
export class AdminSettingsPaypalComponent implements OnInit {
	public settings = <SettingsPayPal>{ production: {}, sandbox: {} };

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<SettingsPayPal>( 'settings/paypal' ).
			snapshotChanges().
			subscribe( this.initiate );
	}

	private initiate = ( action: Action<DocumentSnapshot<SettingsPayPal>> ) => {
		this.settings = Object.assign( this.settings, action.payload.data() );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/paypal' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}

}
