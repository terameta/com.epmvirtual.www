import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ImageGroupType } from 'src/app/models/imagegroup.models';
import { JSONDeepCopy, isNumeric } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-image-group-detail',
	templateUrl: './admin-image-group-detail.component.html',
	styleUrls: [ './admin-image-group-detail.component.scss' ]
} )
export class AdminImageGroupDetailComponent implements OnInit {
	public types = Object.entries( JSONDeepCopy( ImageGroupType ) ).filter( a => isNumeric( a[ 1 ] ) );

	constructor(
		public ss: SharedService
	) { }

	ngOnInit() {
		console.log( this.types );
	}

}
