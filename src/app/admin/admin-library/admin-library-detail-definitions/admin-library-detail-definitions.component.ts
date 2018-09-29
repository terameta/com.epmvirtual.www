import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { filter } from 'rxjs/operators';
import { ItemType } from '../../../models/generic.models';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-admin-library-detail-definitions',
	templateUrl: './admin-library-detail-definitions.component.html',
	styleUrls: [ './admin-library-detail-definitions.component.scss' ]
} )
export class AdminLibraryDetailDefinitionsComponent implements OnInit, OnDestroy {
	public currentType: ItemType = 0;
	public itemType = ItemType;

	private subs = subsCreate();

	constructor( private ss: SharedService ) { }

	ngOnInit() {
		this.subs.push( this.ss.cItem$.pipe( filter( i => i.id !== '' ) ).subscribe( i => this.currentType = i.type ) );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

}
