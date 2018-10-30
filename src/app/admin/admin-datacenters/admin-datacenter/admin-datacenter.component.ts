import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { getCountries } from 'src/app/shared/countries';

@Component( {
	selector: 'app-admin-datacenter',
	templateUrl: './admin-datacenter.component.html',
	styleUrls: [ './admin-datacenter.component.scss' ]
} )
export class AdminDataCenterComponent implements OnInit {
	public countries = getCountries();

	constructor(
		public ss: SharedService
	) { }

	ngOnInit() {
	}

}
