import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { ISOFile } from 'src/app/models/isofile.models';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-iso-files',
	templateUrl: './iso-files.component.html',
	styleUrls: [ './iso-files.component.scss' ]
} )
export class IsoFilesComponent implements OnInit {
	public items$ = this.db.collection<ISOFile>( 'isofiles' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<ISOFile>( d ).sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
