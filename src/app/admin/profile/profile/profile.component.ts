import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.scss' ]
} )
export class ProfileComponent implements OnInit {
	public item$ = this.authService.user;

	constructor(
		private authService: AuthService
	) { }

	ngOnInit() { }

	public saveProfile = ( user: firebase.User, form: NgForm ) => {
		const promises: Promise<any>[] = [];
		console.log( form.form.value );
		console.log( form.form.controls );
		Object.entries( form.form.controls ).forEach( ( [ label, { dirty, ...control } ] ) => {
			console.log( label, dirty, control );
			if ( label === 'dName' && dirty ) promises.push( user.updateProfile( { displayName: control.value } ) );
			if ( label === 'eMailAddress' && dirty ) promises.push( user.updateEmail( control.value ) );
		} );
		Promise.all( promises ).then( r => {
			console.log( 'All Saved' );
			console.log( r );
			form.form.markAsPristine();
		} );
	}

}
