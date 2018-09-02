import { Component, OnInit, Input } from '@angular/core';
import { Section } from '../../../models/library.models';

@Component( {
	selector: 'app-admin-library-detail-article-section',
	templateUrl: './admin-library-detail-article-section.component.html',
	styleUrls: [ './admin-library-detail-article-section.component.scss' ]
} )
export class AdminLibraryDetailArticleSectionComponent implements OnInit {
	@Input() section: Section = { title: '', content: '', position: 0 };

	editorOptions = {
		theme: 'vs-dark',
		language: 'html',
		automaticLayout: true, minimap: {
			enabled: false
		}
	};

	constructor() { }

	ngOnInit() { }

}
