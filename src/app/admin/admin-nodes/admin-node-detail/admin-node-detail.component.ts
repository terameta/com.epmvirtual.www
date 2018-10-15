import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component( {
	selector: 'app-admin-node-detail',
	templateUrl: './admin-node-detail.component.html',
	styleUrls: [ './admin-node-detail.component.scss' ]
} )
export class AdminNodeDetailComponent implements OnInit {

	constructor(
		private ss: SharedService
	) { }

	ngOnInit() {
		this.ss.cItem$.subscribe( console.log );
	}

}
