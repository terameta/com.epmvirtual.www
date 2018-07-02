import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component( {
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: [ './sign-in.component.scss' ]
} )
export class SignInComponent implements OnInit {
	public email: string;
	public password: string;

	constructor(
		private authService: AuthService
	) { }

	ngOnInit() {
	}

	public signin = () => {
		this.authService.signin( this.email, this.password ).then( console.log ).catch( console.log );
	}

}
