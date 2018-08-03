import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';

import { SettingsGeneral, settingsGeneralDefault, SettingsPhoneNumber } from '../../../../models/settings.general';
import { SortByPosition } from '../../../../utilities/utilityFunctions';

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
			subscribe( this.initiate );
	}

	ngOnInit() {
	}

	private initiate = ( action: Action<DocumentSnapshot<SettingsGeneral>> ) => {
		this.settings = Object.assign( this.settings, action.payload.data() );
	}

	public save = ( form: NgForm ) => {
		this.db.doc( 'settings/general' ).set( this.settings ).then( () => {
			form.form.markAsPristine();
		} );
	}

	public phoneNumberAdd = ( form: NgForm ) => {
		this.settings.phoneNumbers.push( <SettingsPhoneNumber>{ position: this.settings.phoneNumbers.length } );
		form.form.markAsDirty();
	}

	public phoneNumberMoveDown = ( index: number, form: NgForm ) => {
		this.settings.phoneNumbers.forEach( p => p.position *= 10 );
		this.settings.phoneNumbers[ index ].position += 11;
		this.settings.phoneNumbers.sort( SortByPosition );
		this.settings.phoneNumbers.forEach( ( item, itemIndex ) => item.position = itemIndex );
		form.form.markAsDirty();
	}

	public phoneNumberMoveUp = ( index: number, form: NgForm ) => {
		this.settings.phoneNumbers.forEach( p => p.position *= 10 );
		this.settings.phoneNumbers[ index ].position -= 11;
		this.settings.phoneNumbers.sort( SortByPosition );
		this.settings.phoneNumbers.forEach( ( item, itemIndex ) => item.position = itemIndex );
		form.form.markAsDirty();
	}

	public phoneNumberDelete = ( index: number, form: NgForm ) => {
		this.settings.phoneNumbers.splice( index, 1 );
		form.form.markAsDirty();
	}

	public counterAdd = ( form: NgForm ) => {
		this.settings.counters.push( { name: '', value: null } );
		form.form.markAsDirty();
	}

	public counterDelete = ( index: number, form: NgForm ) => {
		this.settings.counters.splice( index, 1 );
		form.form.markAsDirty();
	}

}
