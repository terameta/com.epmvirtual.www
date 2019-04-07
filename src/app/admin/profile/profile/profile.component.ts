import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

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

	ngOnInit() {
		this.authService.user.subscribe( user => {
			console.log( user );
			// user.email
		} );
	}

}
