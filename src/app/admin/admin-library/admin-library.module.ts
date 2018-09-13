import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLibraryDetailComponent } from './admin-library-detail/admin-library-detail.component';
import { AdminLibraryDetailDocumentComponent } from './admin-library-detail-document/admin-library-detail-document.component';
import { AdminLibraryDetailFolderComponent } from './admin-library-detail-folder/admin-library-detail-folder.component';
import { AdminLibraryDetailArticleDefinitionsComponent } from './admin-library-detail-article-definitions/admin-library-detail-article-definitions.component';
import { AdminLibraryDetailArticleSectionComponent } from './admin-library-detail-article-section/admin-library-detail-article-section.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AdminLibraryDetailArticleSeoComponent } from './admin-library-detail-article-seo/admin-library-detail-article-seo.component';
import { AdminLibraryDetailFolderDefinitionsComponent } from './admin-library-detail-folder-definitions/admin-library-detail-folder-definitions.component';
import { AdminLibraryDetailFolderSeoComponent } from './admin-library-detail-folder-seo/admin-library-detail-folder-seo.component';
import { AdminLibraryDetailDefinitionsComponent } from './admin-library-detail-definitions/admin-library-detail-definitions.component';
import { AdminLibraryDetailSeoComponent } from './admin-library-detail-seo/admin-library-detail-seo.component';

const routes: Routes = [
	{
		path: '', component: AdminLibraryComponent, children: [
			{ path: '', redirectTo: '/admin/library/0', pathMatch: 'full' },
			{
				path: ':id', component: AdminLibraryDetailComponent, children: [
					{ path: '', component: AdminLibraryDetailDefinitionsComponent },
					{ path: 'seo', component: AdminLibraryDetailSeoComponent },
					{ path: ':sectionindex', component: AdminLibraryDetailArticleSectionComponent }
				]
			},
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule,
		TabsModule,
		MonacoEditorModule
	],
	declarations: [
		AdminLibraryComponent,
		AdminLibraryDetailComponent,
		AdminLibraryDetailDocumentComponent,
		AdminLibraryDetailFolderComponent,
		AdminLibraryDetailArticleDefinitionsComponent,
		AdminLibraryDetailArticleSectionComponent,
		AdminLibraryDetailArticleSeoComponent,
		AdminLibraryDetailFolderDefinitionsComponent,
		AdminLibraryDetailFolderSeoComponent,
		AdminLibraryDetailDefinitionsComponent,
		AdminLibraryDetailSeoComponent,
	]
} )
export class AdminLibraryModule { }
