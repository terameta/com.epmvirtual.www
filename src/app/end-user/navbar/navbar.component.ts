import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ]
} )
export class NavbarComponent implements OnInit {

	constructor() { console.log( 'Dont forget the order page' ); }

	ngOnInit() {
	}

}
