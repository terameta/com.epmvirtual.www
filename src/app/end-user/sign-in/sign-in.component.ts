import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ]
} )
export class SignInComponent implements OnInit {
	public signInError = '';

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		if ( this.authService.isAuthenticated$.getValue() ) {
			this.signInError = 'You are already signed in. Redirecting...';
			setTimeout( () => {
				if ( this.authService.userDetails.email === 'admin@epmvirtual.com' ) {
					this.router.navigate( [ '/admin' ] );
				} else {
					this.router.navigate( [ '/cloud' ] );
				}
			}, 1000 );
		}

		this.authService.user.subscribe( console.log );
	}

	public signin = ( form: NgForm ) => {
		this.signInError = '';
		this.authService.signin( form.value.email, form.value.password ).
			then( ( result ) => {
				console.log( 'Sign in succeded' );
				console.log( result );
				if ( result.user.email === 'admin@epmvirtual.com' ) {
					this.router.navigate( [ '/admin' ] );
				} else {
					this.router.navigate( [ '/cloud' ] );
				}
			} ).catch( ( error: firebase.auth.Error ) => {
				this.signInError = error.message;
			} );
	}

}
