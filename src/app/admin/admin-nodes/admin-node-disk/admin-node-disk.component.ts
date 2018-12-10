import { Component, OnInit } from '@angular/core';
import { Node } from 'src/app/models/node.models';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/utilities.service';

@Component( {
	selector: 'app-admin-node-disk',
	templateUrl: './admin-node-disk.component.html',
	styleUrls: [ './admin-node-disk.component.scss' ]
} )
export class AdminNodeDiskComponent implements OnInit {
	public codeToggle = false;

	public node$: Observable<Node> = this.ss.cID$.pipe(
		switchMap( id => this.db.doc<Node>( 'nodes/' + id ).snapshotChanges() ),
		map( a => this.us.action2Data<Node>( a ) )
	);

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
