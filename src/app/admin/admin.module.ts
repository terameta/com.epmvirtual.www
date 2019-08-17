import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AdminComponent } from './admin/admin.component';
import { AdminFrontPageComponent } from './admin-front-page/admin-front-page.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSettingsParentComponent } from './admin-settings/admin-settings-parent/admin-settings-parent.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const routes: Routes = [
	{
		path: '', component: AdminComponent, children: [
			{ path: '', component: AdminFrontPageComponent },
			{ path: 'settings', component: AdminSettingsParentComponent, loadChildren: () => import( './admin-settings/admin-settings.module' ).then( m => m.AdminSettingsModule ) },
			{ path: 'library', loadChildren: () => import( './admin-library/admin-library.module' ).then( m => m.AdminLibraryModule ) },
			{ path: 'assets', loadChildren: () => import( './admin-assets/admin-assets.module' ).then( m => m.AdminAssetsModule ) },
			{ path: 'plans', loadChildren: () => import( './admin-plans/admin-plans.module' ).then( m => m.AdminPlansModule ) },
			{ path: 'imagegroups', loadChildren: () => import( './admin-image-groups/admin-image-groups.module' ).then( m => m.AdminImageGroupsModule ) },
			{ path: 'images', loadChildren: () => import( './admin-images/admin-images.module' ).then( m => m.AdminImagesModule ) },
			{ path: 'nodes', loadChildren: () => import( './admin-nodes/admin-nodes.module' ).then( m => m.AdminNodesModule ) },
			{ path: 'datacenters', loadChildren: () => import( './admin-datacenters/admin-datacenters.module' ).then( m => m.AdminDataCentersModule ) },
			{ path: 'storagepools', loadChildren: () => import( './admin-storage-pools/admin-storage-pools.module' ).then( m => m.AdminStoragePoolsModule ) },
			{ path: 'ipblocks', loadChildren: () => import( './ip-blocks/ip-blocks.module' ).then( m => m.IpBlocksModule ) },
			{ path: 'isofiles', loadChildren: () => import( './iso-files/iso-files.module' ).then( m => m.IsoFilesModule ) },
			{ path: 'mailtemplates', loadChildren: () => import( './mail-templates/mail-templates.module' ).then( m => m.MailTemplatesModule ) },
			{ path: 'servers', loadChildren: () => import( './servers/servers.module' ).then( m => m.ServersModule ) },
			{ path: 'profile', loadChildren: () => import( './profile/profile.module' ).then( m => m.ProfileModule ) }
			// { path: 'settings', component: AdminSettingsParentComponent, loadChildren: './admin-settings/admin-settings.module#AdminSettingsModule' },
			// { path: 'library', loadChildren: './admin-library/admin-library.module#AdminLibraryModule' },
			// { path: 'assets', loadChildren: './admin-assets/admin-assets.module#AdminAssetsModule' },
			// { path: 'plans', loadChildren: './admin-plans/admin-plans.module#AdminPlansModule' },
			// { path: 'imagegroups', loadChildren: './admin-image-groups/admin-image-groups.module#AdminImageGroupsModule' },
			// { path: 'images', loadChildren: './admin-images/admin-images.module#AdminImagesModule' },
			// { path: 'nodes', loadChildren: './admin-nodes/admin-nodes.module#AdminNodesModule' },
			// { path: 'datacenters', loadChildren: './admin-datacenters/admin-datacenters.module#AdminDataCentersModule' },
			// { path: 'storagepools', loadChildren: './admin-storage-pools/admin-storage-pools.module#AdminStoragePoolsModule' },
			// { path: 'ipblocks', loadChildren: './ip-blocks/ip-blocks.module#IpBlocksModule' },
			// { path: 'isofiles', loadChildren: './iso-files/iso-files.module#IsoFilesModule' },
			// { path: 'mailtemplates', loadChildren: './mail-templates/mail-templates.module#MailTemplatesModule' },
			// { path: 'servers', loadChildren: './servers/servers.module#ServersModule' },
			// { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		CollapseModule,
		BsDropdownModule
	],
	declarations: [
		AdminComponent,
		AdminFrontPageComponent,
		AdminNavbarComponent
	]
} )
export class AdminModule { }
