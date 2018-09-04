import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-detail-article-linkedin',
	templateUrl: './admin-library-detail-article-linkedin.component.html',
	styleUrls: [ './admin-library-detail-article-linkedin.component.scss' ]
} )
export class AdminLibraryDetailArticleLinkedinComponent implements OnInit {
	@Input() item: Article = <Article>getDefaultItem();

	constructor() { }

	ngOnInit() {
	}

}
