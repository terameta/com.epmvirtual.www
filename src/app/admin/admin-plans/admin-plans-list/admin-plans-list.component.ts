import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plan } from '../../../models/plan.models';
import { SharedService } from '../../../shared/shared.service';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-admin-plans-list',
	templateUrl: './admin-plans-list.component.html',
	styleUrls: [ './admin-plans-list.component.scss' ]
} )
export class AdminPlansListComponent implements OnInit, OnDestroy {
	public items: Plan[] = [];
	public itemsReceived = false;
	public concept = 'plans';

	private subs = subsCreate();

	constructor(
		private db: AngularFirestore
	) { }

	ngOnInit() {
		this.subs.push( this.db.collection<Plan>( '/plans' ).
			snapshotChanges().
			pipe( debounce( () => timer( 500 ) ) ).
			subscribe( this.handleListChange ) );
	}

	private handleListChange = ( actions: DocumentChangeAction<Plan>[] ) => {
		this.itemsReceived = true;
		this.items = actions.
			map( a => ( { ...a.payload.doc.data(), ...{ id: a.payload.doc.id } } ) ).
			sort( SortByPosition );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

}
