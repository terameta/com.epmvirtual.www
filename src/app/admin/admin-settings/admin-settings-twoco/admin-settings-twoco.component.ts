import { Component, OnInit } from '@angular/core';
import { Settings2CO } from '../../../../models/settings.2co';
import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-admin-settings-twoco',
	templateUrl: './admin-settings-twoco.component.html',
	styleUrls: [ './admin-settings-twoco.component.scss' ]
} )
export class AdminSettingsTwocoComponent implements OnInit {
	public settings = <Settings2CO>{ production: {}, sandbox: {}, demo: {} };

	constructor(
		private db: AngularFirestore
	) {
		this.db.
			doc<Settings2CO>( 'settings/2co' ).
			snapshotChanges().
			subscribe( this.initiate );
	}

	private initiate = ( action: Action<DocumentSnapshot<Settings2CO>> ) => {
		this.settings = Object.assign( this.settings, action.payload.data() );
	}

	ngOnInit() {
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/2co' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}
}
