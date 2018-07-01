import { Component, OnInit } from '@angular/core';
import { CentralStatusService } from './centralstatus.service';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
	constructor(
		public centralStatus: CentralStatusService
	) { }

	ngOnInit() {
	}

}
