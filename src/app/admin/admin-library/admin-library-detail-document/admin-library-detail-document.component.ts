import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';
import { filter, tap } from 'rxjs/operators';
import { SortByPosition } from '../../../../utilities/utilityFunctions';

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
				tap( () => this.itemReceived = true )
			).subscribe( this.handleItemChange )
		);
	}

	ngOnDestroy() { this.ss.unsub( this.subs ); }

	private handleItemChange = ( i: Article ) => {
		this.item = i;
		if ( !this.item.sections ) this.item.sections = [];
		this.item.sections.sort( SortByPosition );
		this.item.sections.forEach( ( s, index ) => {
			s.position = index + 1;
		} );
	}

	public newSection = async () => {
		const newTitle = await this.ss.prompt( 'Title of the section', 'New Section' );
		if ( newTitle ) this.item.sections.push( { title: newTitle, content: '', position: this.item.sections.length + 1 } );
		this.ss.save( this.item );
	}

}
