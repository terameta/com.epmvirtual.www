import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminImageGroupsComponent } from './admin-image-groups/admin-image-groups.component';
import { AdminImageGroupListComponent } from './admin-image-group-list/admin-image-group-list.component';
import { AdminImageGroupDetailComponent } from './admin-image-group-detail/admin-image-group-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: AdminImageGroupsComponent, children: [
			{ path: '', component: AdminImageGroupListComponent },
			{ path: ':id', component: AdminImageGroupDetailComponent }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule
	],
	declarations: [
		AdminImageGroupsComponent,
		AdminImageGroupListComponent,
		AdminImageGroupDetailComponent
	]
} )
export class AdminImageGroupsModule { }
