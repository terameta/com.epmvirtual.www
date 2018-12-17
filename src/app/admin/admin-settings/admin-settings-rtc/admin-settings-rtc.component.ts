import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { map, tap } from 'rxjs/operators';
import { settingsRTCDefault, SettingsRTC } from 'src/models/settings.rtc';
import { NgForm } from '@angular/forms';
import { firestore } from 'firebase/app';

@Component( {
	selector: 'app-admin-settings-rtc',
	templateUrl: './admin-settings-rtc.component.html',
	styleUrls: [ './admin-settings-rtc.component.scss' ]
} )
export class AdminSettingsRtcComponent implements OnInit {
	public newServer = '';
	public settings$ = this.db.doc( 'settings/rtc' ).snapshotChanges().pipe(
		tap( a => { if ( !a.payload.data() ) this.createSetting(); } ),
		map( a => this.us.action2Data<SettingsRTC>( a ) ),
		map( s => this.us.assignOver( settingsRTCDefault(), s ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

	public addiceServer = async ( f: NgForm ) => {
		await this.db.doc( 'settings/rtc' ).update( {
			'servers.iceServers': firestore.FieldValue.arrayUnion( { urls: this.newServer } )
		} );
		this.newServer = '';
		f.form.markAsPristine();
	}

	public deliceServer = async ( toRemove ) => {
		this.db.doc( 'settings/rtc' ).update( { 'servers.iceServers': firestore.FieldValue.arrayRemove( toRemove ) } );
	}

	public save = async ( settings: SettingsRTC, f: NgForm ) => {
		await this.db.doc( 'settings/rtc' ).update( settings );
		f.form.markAsPristine();
	}

	public createSetting = async () => {
		this.db.doc( 'settings/rtc' ).set( settingsRTCDefault() );
	}

}
