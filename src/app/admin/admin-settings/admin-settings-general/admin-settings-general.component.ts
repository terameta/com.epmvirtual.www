import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';

import { SettingsGeneral, settingsGeneralDefault, SettingsPhoneNumber } from '../../../../models/settings.general';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { AdminSettingsService } from '../admin-settings.service';
import { SharedService } from '../../../shared/shared.service';

@Component( {
	selector: 'app-admin-settings-general',
	templateUrl: './admin-settings-general.component.html',
	styleUrls: [ './admin-settings-general.component.scss' ]
} )
export class AdminSettingsGeneralComponent implements OnInit {
	public settings: SettingsGeneral = settingsGeneralDefault();

	constructor(
		private ms: AdminSettingsService,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.ss.cItem$.subscribe( this.initiate );
	}

	private initiate = ( s ) => {
		this.settings = Object.assign( this.settings, s );
	}

	public save = ( form: NgForm ) => {
		// this.db.doc( 'settings/general' ).set( this.settings ).then( () => {
		// 	form.form.markAsPristine();
		// } );
		this.ss.save( this.settings ).then( () => {
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

	public counterIncrement = ( index: number, increment: number, form: NgForm ) => {
		this.ms.counterIncrement( this.settings.counters[ index ].name, increment ).then( ( result ) => {
			console.log( 'New counter value is assigned as', result );
		} );
	}

}
