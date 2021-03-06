import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { SharedService } from '../../../shared/shared.service';
import { filter, map, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-admin-library-detail-article-definitions',
	templateUrl: './admin-library-detail-article-definitions.component.html',
	styleUrls: [ './admin-library-detail-article-definitions.component.scss' ]
} )
export class AdminLibraryDetailArticleDefinitionsComponent implements OnInit, OnDestroy {
	public item: Article = <Article>getDefaultItem();

	private subs = subsCreate();

	constructor( public ss: SharedService ) { }

	ngOnInit() {
		this.subs.push(
			this.ss.cItem$.
				pipe(
					filter( i => i.id !== '' ),
					map( i => ( <Article>i ) ),
					tap( d => { d.createdOn = d.createdOn ? ( d.createdOn as any ).toDate() : ( new Date() ); } )
				).
				subscribe( i => this.item = { ...<Article>getDefaultItem(), ...i } )
		);
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	public sectionUp = ( i: number ) => this.sectionChangeorder( i, -1 );
	public sectionDown = ( i: number ) => this.sectionChangeorder( i, 1 );
	public sectionChangeorder = ( i: number, direction: 1 | -1 ) => {
		this.item.sections.forEach( ( section, index ) => {
			section.position = section.position * 10;
			if ( i === index ) section.position += direction * 11;
		} );
		this.item.sections.sort( SortByPosition );
		this.item.sections.forEach( ( section, index ) => {
			section.position = index + 1;
		} );
		this.ss.save( this.item );
	}

	public sectionDelete = ( i: number, f?: NgForm ) => {
		this.item.sections.splice( i, 1 );
		this.item.sections.forEach( ( s, si ) => {
			s.position = si + 1;
		} );
		this.ss.save( this.item, f );
	}

	public sectionCreate = ( f?: NgForm ) => {
		this.item.sections.push( { title: 'New Section', content: '', position: ( this.item.sections.length + 1 ) } );
		this.ss.save( this.item, f );
	}

	public publish = ( f?: NgForm ) => { this.item.published = true; this.ss.save( this.item, f ); };
	public unpublish = ( f?: NgForm ) => { this.item.published = false; this.ss.save( this.item, f ); };

}
