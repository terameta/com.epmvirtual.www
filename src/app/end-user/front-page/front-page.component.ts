import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { FirebaseError } from 'firebase';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-front-page',
	templateUrl: './front-page.component.html',
	styleUrls: [ './front-page.component.scss' ]
} )
export class FrontPageComponent implements OnInit {
	public signUpError = '';

	constructor(
		public authService: AuthService,
		private router: Router
	) {
		console.log( 'Create a central-status service' );
		console.log( 'Create a password recovery page' );
	}

	ngOnInit() {
	}

	public signUp = ( form: NgForm ) => {
		this.signUpError = '';
		this.authService.signup( form.value.email, form.value.password ).
			then( ( result ) => {
				if ( result.user.email === 'admin@epmvirtual.com' ) {
					this.router.navigate( [ '/admin' ] );
				} else {
					this.router.navigate( [ '/console' ] );
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
