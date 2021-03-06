import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { ImageGroup } from 'src/app/models/imagegroup.models';
import { map } from 'rxjs/operators';
import { SortByPosition } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-image-groups',
	templateUrl: './admin-image-groups.component.html',
	styleUrls: [ './admin-image-groups.component.scss' ]
} )
export class AdminImageGroupsComponent {

	public igs$ = this.db.collection<ImageGroup>( 'imagegroups' ).
		snapshotChanges().pipe(
			map( d => this.us.actions2Data<ImageGroup>( d ) ),
			map( d => d.sort( SortByPosition ) )
		);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

}
