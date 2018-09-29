import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { getDefaultPlan, Plan } from '../../../models/plan.models';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { UtilitiesService } from '../../../shared/utilities.service';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-admin-plans',
	templateUrl: './admin-plans.component.html',
	styleUrls: [ './admin-plans.component.scss' ]
} )
export class AdminPlansComponent implements OnInit, OnDestroy {
	public items: Plan[] = [];

	private subs = subsCreate();

	constructor(
		private ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.subs.push( this.db.collection<Plan>( '/plans' ).
			snapshotChanges().
			pipe( debounce( () => timer( 500 ) ) ).
			subscribe( this.handleListChange ) );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleListChange = ( actions: DocumentChangeAction<Plan>[] ) => {
		this.items = actions.
			map( a => ( { ...a.payload.doc.data(), ...{ id: a.payload.doc.id } } ) ).
			sort( SortByPosition );

		this.items.forEach( ( item, index ) => {
			if ( item.position !== ( index + 1 ) ) {
				this.db.doc( '/plans/' + item.id ).update( { position: index + 1 } );
			}
		} );
	}

	public create = async () => {
		const name = await this.ss.prompt( 'What is the name of the new plan?', 'New Plan' );
		if ( name ) {
			const newPlan = getDefaultPlan();
			newPlan.name = name;
			newPlan.id = this.db.createId();
			this.db.doc( '/plans/' + newPlan.id ).set( newPlan ).then( () => {
				this.us.navigateByUrl( '/admin/plans/' + newPlan.id );
			} ).catch( console.error );
		}
	}

}
