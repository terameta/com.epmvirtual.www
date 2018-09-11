import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section, Article } from '../../../models/library.models';
import { SharedService } from '../../../shared/shared.service';
import { Item, getDefaultItem } from '../../../models/generic.models';
import { filter } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-library-detail-article-section',
	templateUrl: './admin-library-detail-article-section.component.html',
	styleUrls: [ './admin-library-detail-article-section.component.scss' ]
} )
export class AdminLibraryDetailArticleSectionComponent implements OnInit, OnDestroy {
	public section: Section = { title: '', content: '', position: 0 };
	public item: Article;

	private subs = this.ss.subsCreate();

	editorOptions = {
		theme: 'vs-dark',
		language: 'html',
		automaticLayout: true, minimap: {
			enabled: false
		}
	};

	constructor( public ss: SharedService ) { }

	ngOnInit() { this.subs.push( this.ss.cItem$.pipe( filter( i => i.id !== '' ) ).subscribe( this.handleItem ) ); }

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleItem = ( i: Item ) => {
		const sectionIndex = parseInt( this.ss.cURL$.getValue().split( '/' ).pop(), 10 );
		this.item = { ...<Article>getDefaultItem(), ...i };
		if ( this.item.sections[ sectionIndex ] ) this.section = this.item.sections[ sectionIndex ];
		// console.log( this.ss.cURL$.getValue().split( '/' ).pop() );
	}

}
