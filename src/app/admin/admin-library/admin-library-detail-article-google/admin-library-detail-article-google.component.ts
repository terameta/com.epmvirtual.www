import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-detail-article-google',
	templateUrl: './admin-library-detail-article-google.component.html',
	styleUrls: [ './admin-library-detail-article-google.component.scss' ]
} )
export class AdminLibraryDetailArticleGoogleComponent implements OnInit {
	@Input() item: Article = <Article>getDefaultItem();

	constructor() { }

	ngOnInit() {
	}

}
