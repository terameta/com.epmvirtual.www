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

const routes: Routes = [
	{
		path: '', component: AdminLibraryComponent, children: [
			{ path: '', redirectTo: '/admin/library/0', pathMatch: 'full' },
			{ path: ':id', component: AdminLibraryDetailComponent },
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule,
		TabsModule
	],
	declarations: [
		AdminLibraryComponent,
		AdminLibraryDetailComponent,
		AdminLibraryDetailDocumentComponent,
		AdminLibraryDetailFolderComponent,
		AdminLibraryDetailArticleDefinitionsComponent,
		AdminLibraryDetailArticleSectionComponent
	]
} )
export class AdminLibraryModule { }
