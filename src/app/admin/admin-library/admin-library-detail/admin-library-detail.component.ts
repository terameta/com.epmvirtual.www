import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { filter } from 'rxjs/operators';
import { getDefaultItem } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';

@Component( {
	selector: 'app-admin-library-detail',
	templateUrl: './admin-library-detail.component.html',
	styleUrls: [ './admin-library-detail.component.scss' ]
} )
export class AdminLibraryDetailComponent implements OnInit, OnDestroy {
	public item = <Article>getDefaultItem();

	private subs = this.ss.subsCreate();

	constructor( private ss: SharedService ) { }

	ngOnInit() {
		this.subs.push(
			this.ss.cItem$.
				pipe( filter( a => a.id !== '' ) ).
				subscribe( i => this.item = ( i as Article ) )
		);
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

}
