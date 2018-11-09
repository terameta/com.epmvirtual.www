import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AdminComponent } from './admin/admin.component';
import { AdminFrontPageComponent } from './admin-front-page/admin-front-page.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSettingsParentComponent } from './admin-settings/admin-settings-parent/admin-settings-parent.component';

const routes: Routes = [
	{
		path: '', component: AdminComponent, children: [
			{ path: '', component: AdminFrontPageComponent },
			{ path: 'settings', component: AdminSettingsParentComponent, loadChildren: './admin-settings/admin-settings.module#AdminSettingsModule' },
			{ path: 'library', loadChildren: './admin-library/admin-library.module#AdminLibraryModule' },
			{ path: 'assets', loadChildren: './admin-assets/admin-assets.module#AdminAssetsModule' },
			{ path: 'plans', loadChildren: './admin-plans/admin-plans.module#AdminPlansModule' },
			{ path: 'image-groups', loadChildren: './admin-image-groups/admin-image-groups.module#AdminImageGroupsModule' },
			{ path: 'images', loadChildren: './admin-images/admin-images.module#AdminImagesModule' },
			{ path: 'nodes', loadChildren: './admin-nodes/admin-nodes.module#AdminNodesModule' },
			{ path: 'datacenters', loadChildren: './admin-datacenters/admin-datacenters.module#AdminDataCentersModule' },
			{ path: 'storagepools', loadChildren: './admin-storage-pools/admin-storage-pools.module#AdminStoragePoolsModule' }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		CollapseModule
	],
	declarations: [
		AdminComponent,
		AdminFrontPageComponent,
		AdminNavbarComponent
	]
} )
export class AdminModule { }
