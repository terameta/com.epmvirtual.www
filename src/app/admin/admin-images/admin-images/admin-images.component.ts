import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';
import { Image } from 'src/app/models/image.models';

@Component( {
	selector: 'app-admin-images',
	templateUrl: './admin-images.component.html',
	styleUrls: [ './admin-images.component.scss' ]
} )
export class AdminImagesComponent implements OnInit {
	public images$ = this.db.collection<Image>( 'images' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<Image>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
