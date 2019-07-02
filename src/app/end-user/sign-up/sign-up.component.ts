import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { FirebaseError } from 'firebase';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: [ './sign-up.component.scss' ]
} )
export class SignUpComponent implements OnInit {
	public signUpError = '';

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		if ( this.authService.isAuthenticated$.getValue() ) {
			this.signUpError = 'You are already signed in. Redirecting...';
			setTimeout( () => {
				if ( this.authService.userDetails.email === 'admin@epmvirtual.com' ) {
					this.router.navigate( [ '/admin' ] );
				} else {
					this.router.navigate( [ '/cloud' ] );
				}
			}, 1000 );
		}
	}

	public signUp = ( form: NgForm ) => {
		this.signUpError = '';
		this.authService.signup( form.value.email, form.value.password ).
			then( ( result ) => {
				console.log( 'Sign in succeded' );
				console.log( result );
				if ( this.authService.userDetails.email === 'admin@epmvirtual.com' ) {
					this.router.navigate( [ '/admin' ] );
				} else {
					this.router.navigate( [ '/cloud' ] );
				}
			} ).catch( ( e: FirebaseError ) => {
				this.signUpError = e.message;
				console.log( 'Error.code:', e.code );
				console.log( 'Error.Message:', e.message );
				console.log( 'Error.Name:', e.name );
				console.log( 'Error.Stack:', e.stack );
			} );
	}

}
