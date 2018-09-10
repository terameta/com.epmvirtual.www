import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

	private subs = this.ss.subsCreate();

	constructor( public ss: SharedService ) { }

	ngOnInit() {
		this.subs.push(
			this.ss.cItem$.pipe(
				filter( i => i.id !== '' ),
				tap( ( i: any ) => { i.createdOn = i.createdOn ? i.createdOn.toDate() : ( new Date() ); } )
			).subscribe( this.handleItemChange )
		);
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleItemChange = ( i: Article ) => {
		this.item = i;
		if ( !this.item.sections ) this.item.sections = [];
		this.item.sections.sort( SortByPosition );
		this.item.sections.forEach( ( s, index ) => {
			s.position = index + 1;
		} );
		// this.setSelected();
	}

	public newSection = async () => {
		const newTitle = await this.ss.prompt( 'Title of the section', 'New Section' );
		if ( newTitle ) this.item.sections.push( { title: newTitle, content: '', position: this.item.sections.length + 1 } );
		this.ss.save( this.item );
	}

	// public onSelect = () => {
	// 	setTimeout( this.onSelectDelayed, 1 );
	// }

	// private onSelectDelayed = () => {
	// 	this.sectionTabs.tabs.forEach( ( t, i ) => {
	// 		if ( t.active ) this.selectedTab = i;
	// 	} );
	// }

	// private setSelected = () => {
	// 	setTimeout( this.setSelectedDelayed, 1 );
	// }

	// private setSelectedDelayed = () => {
	// 	if ( this.sectionTabs ) this.sectionTabs.tabs[ this.selectedTab ].active = true;
	// }

}
