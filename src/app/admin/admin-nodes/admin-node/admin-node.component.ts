import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Node, CommandType } from 'src/app/models/node.models';
import { firestore } from 'firebase/app';
import { Subscription } from 'rxjs';

@Component( {
	selector: 'app-admin-node',
	templateUrl: './admin-node.component.html',
	styleUrls: [ './admin-node.component.scss' ]
} )
export class AdminNodeComponent implements OnInit {
	private nodeRef: AngularFirestoreDocument;

	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.nodeRef = this.db.doc( 'nodes/' + this.ss.cID$.getValue() );
	}

	public reboot = async () => {
		if ( await this.ss.confirm( 'Are you sure you want to reboot the node?' ) ) {
			this.nodeRef.update( {
				commands: firestore.FieldValue.arrayUnion( {
					date: new Date(),
					commandType: CommandType.reboot
				} )
			} );
		}
	}

	public shutdown = async () => {
		if ( await this.ss.confirm( 'Are you sure you want to shutdown the node?' ) ) {
			this.nodeRef.update( {
				commands: firestore.FieldValue.arrayUnion( {
					date: new Date(),
					commandType: CommandType.shutdown
				} )
			} );
		}
	}

}
