import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-detail-article-twitter',
	templateUrl: './admin-library-detail-article-twitter.component.html',
	styleUrls: [ './admin-library-detail-article-twitter.component.scss' ]
} )
export class AdminLibraryDetailArticleTwitterComponent implements OnInit {
	@Input() item: Article = <Article>getDefaultItem();

	constructor() { }

	ngOnInit() {
	}

}
