import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component( {
	selector: 'app-end-user',
	templateUrl: './end-user.component.html',
	styleUrls: [ './end-user.component.scss' ]
} )
export class EndUserComponent implements OnInit {

	constructor( public ss: SharedService ) { }

	ngOnInit() {
		console.log( 'Activate the links on the footer' );
	}

}
