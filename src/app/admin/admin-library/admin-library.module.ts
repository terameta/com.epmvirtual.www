import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLibraryDetailComponent } from './admin-library-detail/admin-library-detail.component';
import { AdminLibraryDetailDocumentComponent } from './admin-library-detail-document/admin-library-detail-document.component';
import { AdminLibraryDetailFolderComponent } from './admin-library-detail-folder/admin-library-detail-folder.component';

const routes: Routes = [
	{
		path: '', component: AdminLibraryComponent, children: [
			{ path: '', redirectTo: '0', pathMatch: 'prefix' },
			{ path: ':id', component: AdminLibraryDetailComponent },
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		AdminLibraryComponent,
		AdminLibraryDetailComponent,
		AdminLibraryDetailDocumentComponent,
		AdminLibraryDetailFolderComponent
	]
} )
export class AdminLibraryModule { }
