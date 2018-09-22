import { Component, OnInit } from '@angular/core';
import { SettingsSparkPost } from '../../../../models/settings.sparkpost';
import { AngularFirestore, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-admin-settings-sparkpost',
	templateUrl: './admin-settings-sparkpost.component.html',
	styleUrls: [ './admin-settings-sparkpost.component.scss' ]
} )
export class AdminSettingsSparkpostComponent implements OnInit {
	public settings = <SettingsSparkPost>{};

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<SettingsSparkPost>( 'settings/sparkpost' ).
			snapshotChanges().
			subscribe( this.initiate );
	}

	private initiate = ( action: Action<DocumentSnapshot<SettingsSparkPost>> ) => {
		this.settings = Object.assign( this.settings, action.payload.data() );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/sparkpost' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}
}
