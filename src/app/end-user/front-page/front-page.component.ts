import { Component, OnInit } from '@angular/core';

@Component( {
	selector: 'app-front-page',
	templateUrl: './front-page.component.html',
	styleUrls: [ './front-page.component.scss' ]
} )
export class FrontPageComponent implements OnInit {

	constructor() {
		console.log( 'Fix the sign up form in the front page' );
		console.log( 'Create a central-status service' );
	}

	ngOnInit() {
	}

}
