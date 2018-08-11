import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AdminLibraryService } from '../admin-library.service';
import { AdminSharedService } from '../../admin-shared-service.service';

@Component( {
	selector: 'app-admin-library-detail',
	templateUrl: './admin-library-detail.component.html',
	styleUrls: [ './admin-library-detail.component.scss' ]
} )
export class AdminLibraryDetailComponent implements OnInit {

	constructor(
		private db: AngularFirestore,
		private ms: AdminLibraryService,
		private ss: AdminSharedService
	) {
		this.ss.currentIDO.subscribe( console.log );
	}

	ngOnInit() {
	}

}
