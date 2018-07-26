import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component( {
	selector: 'app-admin-navbar',
	templateUrl: './admin-navbar.component.html',
	styleUrls: [ './admin-navbar.component.scss' ]
} )
export class AdminNavbarComponent implements OnInit {
	isCollapsed = true;

	constructor(
		private as: AuthService,
		private router: Router
	) { }

	ngOnInit() {
	}

	public signOut = () => {
		console.log( this.as );
		this.as.signout();
		this.router.navigate( [ '/signin' ] );
	}

}
