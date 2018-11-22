import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, defaultNode } from 'src/app/models/node.models';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
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
	private nodeRef: AngularFirestoreDocument;

	public setCommands = [
		{ label: 'List Files (ls -lh)', command: 'ls -lh' },
		{ label: 'List Files (dir)', command: 'dir' }
	];

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.nodeRef = this.db.doc<Node>( 'nodes/' + this.ss.cID$.getValue() );

		this.node$ = this.nodeRef.snapshotChanges().
			pipe( map( a => ( { ...defaultNode(), ...this.us.action2Data<Node>( a ) } ) ) );
	}

	public runCommand = async ( command: string ) => {
		console.log( 'Command to run:', command );
		this.nodeRef.update( {
			commands: firestore.FieldValue.arrayUnion( {
				date: new Date(),
				command
			} )
		} );
	}

}
