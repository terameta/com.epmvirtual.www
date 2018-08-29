import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';
import { filter, tap } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-library-detail-document',
	templateUrl: './admin-library-detail-document.component.html',
	styleUrls: [ './admin-library-detail-document.component.scss' ]
} )
export class AdminLibraryDetailDocumentComponent implements OnInit, OnDestroy {
	public item: Article = <Article>getDefaultItem();
	public itemReceived = false;

	private subs = this.ss.getsubs();

	constructor(
		public ss: SharedService
	) { }

	ngOnInit() {
		this.subs.push(
			this.ss.cItem$.pipe(
				filter( i => i.id !== '' ),
				tap( ( i: any ) => { i.createdOn = i.createdOn ? i.createdOn.toDate() : ( new Date() ); } ),
				tap( i => this.itemReceived = true )
			).subscribe( i => this.item = i )
		);
	}

	ngOnDestroy() { this.ss.unsub( this.subs ); }

}
