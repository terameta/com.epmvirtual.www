import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plan } from '../../models/plan.models';
import { SharedService } from '../../shared/shared.service';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { SortByPosition } from '../../../utilities/utilityFunctions';

@Component( {
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: [ './servers.component.scss' ]
} )
export class ServersComponent implements OnInit, OnDestroy {
	public plans: Plan[] = [];

	private subs = this.ss.subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.db.collection<Plan>( '/plans' ).
			snapshotChanges().subscribe( this.handleListChange )
		);
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleListChange = ( actions: DocumentChangeAction<Plan>[] ) => {
		this.plans = actions.
			map( a => ( { ...a.payload.doc.data() } ) ).
			sort( SortByPosition );
	}

}
