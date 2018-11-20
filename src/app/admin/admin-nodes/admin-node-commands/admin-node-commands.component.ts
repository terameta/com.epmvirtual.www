import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, defaultNode } from 'src/app/models/node.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/utilities.service';

@Component( {
	selector: 'app-admin-node-commands',
	templateUrl: './admin-node-commands.component.html',
	styleUrls: [ './admin-node-commands.component.scss' ]
} )
export class AdminNodeCommandsComponent implements OnInit {
	public node$: Observable<Node>;

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.node$ = this.db.doc<Node>( 'nodes/' + this.ss.cID$.getValue() ).
			snapshotChanges().pipe( map( a => ( { ...defaultNode(), ...this.us.action2Data<Node>( a ) } ) ) );
	}

}
