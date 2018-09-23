import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plan, getDefaultPlan } from '../../../models/plan.models';
import { SharedService } from '../../../shared/shared.service';
import { filter, tap, map } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-plans-detail',
	templateUrl: './admin-plans-detail.component.html',
	styleUrls: [ './admin-plans-detail.component.scss' ]
} )
export class AdminPlansDetailComponent implements OnInit, OnDestroy {
	public item: Plan = getDefaultPlan();

	private subs = this.ss.subsCreate();

	constructor( public ss: SharedService ) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.
			pipe(
				filter( i => ( !!i.id ) ),
				map( i => ( <Plan>( i as any ) ) )
			).subscribe( ( i: Plan ) => {
				this.item = i;
			} )
		);
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

}
