import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/library.models';
import { getDefaultItem } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-detail-article-facebook',
	templateUrl: './admin-library-detail-article-facebook.component.html',
	styleUrls: [ './admin-library-detail-article-facebook.component.scss' ]
} )
export class AdminLibraryDetailArticleFacebookComponent implements OnInit {
	@Input() item: Article = <Article>getDefaultItem();

	constructor() { }

	ngOnInit() {
	}

}
