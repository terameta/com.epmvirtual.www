import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component( {
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ]
} )
export class NavbarComponent implements OnInit {

	constructor(
		public authService: AuthService
	) { console.log( 'Dont forget the order page' ); }

	ngOnInit() {
	}

}
