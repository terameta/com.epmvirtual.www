import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { SharedService } from '../../../shared/shared.service';

@Component( {
	selector: 'app-admin-library-detail-article-definitions',
	templateUrl: './admin-library-detail-article-definitions.component.html',
	styleUrls: [ './admin-library-detail-article-definitions.component.scss' ]
} )
export class AdminLibraryDetailArticleDefinitionsComponent implements OnInit {
	@Input() item: Article = <Article>getDefaultItem();

	constructor( public ss: SharedService ) { }

	ngOnInit() {
	}

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

}
