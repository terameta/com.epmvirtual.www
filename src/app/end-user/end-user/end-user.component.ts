import { Component, OnInit } from '@angular/core';
import { CentralStatusService } from '../../centralstatus.service';

@Component( {
	selector: 'app-end-user',
	templateUrl: './end-user.component.html',
	styleUrls: [ './end-user.component.scss' ]
} )
export class EndUserComponent implements OnInit {

	constructor( public centralStatus: CentralStatusService ) { }

	ngOnInit() {
	}

}
