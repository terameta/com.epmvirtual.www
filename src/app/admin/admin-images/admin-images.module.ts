import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminImagesComponent } from './admin-images/admin-images.component';
import { AdminImageListComponent } from './admin-image-list/admin-image-list.component';
import { AdminImageDetailComponent } from './admin-image-detail/admin-image-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: AdminImagesComponent, children: [
			{ path: '', component: AdminImageListComponent },
			{ path: ':id', component: AdminImageDetailComponent }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		AdminImagesComponent,
		AdminImageListComponent,
		AdminImageDetailComponent
	]
} )
export class AdminImagesModule { }
