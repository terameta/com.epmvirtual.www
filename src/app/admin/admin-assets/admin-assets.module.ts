import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAssetsComponent } from './admin-assets/admin-assets.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminAssetsDetailComponent } from './admin-assets-detail/admin-assets-detail.component';
import { AdminAssetsDetailFolderComponent } from './admin-assets-detail-folder/admin-assets-detail-folder.component';
import { AdminAssetsDetailAssetComponent } from './admin-assets-detail-asset/admin-assets-detail-asset.component';

const routes: Routes = [
	{
		path: '', component: AdminAssetsComponent, children: [
			{ path: '', redirectTo: '0', pathMatch: 'prefix' },
			{ path: ':id', component: AdminAssetsDetailComponent },
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		AdminAssetsComponent,
		AdminAssetsDetailComponent,
		AdminAssetsDetailFolderComponent,
		AdminAssetsDetailAssetComponent
	]
} )
export class AdminAssetsModule { }
