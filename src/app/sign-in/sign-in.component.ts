import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ]
} )
export class SignInComponent implements OnInit {
	public signInError = '';

	constructor(
		private authService: AuthService
	) { }

	ngOnInit() {
	}

	public signin = ( form: NgForm ) => {
		this.signInError = '';
		this.authService.signin( form.value.email, form.value.password ).
			then( ( result ) => {
				console.log( 'Sign in succeded' );
				console.log( result );
			} ).catch( ( error: firebase.auth.Error ) => {
				this.signInError = error.message;
			} );
	}

}
