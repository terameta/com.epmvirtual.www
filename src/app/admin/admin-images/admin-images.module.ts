import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminImagesComponent } from './admin-images/admin-images.component';
import { AdminImageListComponent } from './admin-image-list/admin-image-list.component';
import { AdminImageDetailComponent } from './admin-image-detail/admin-image-detail.component';

@NgModule( {
	imports: [
		CommonModule
	],
	declarations: [
		AdminImagesComponent,
		AdminImageListComponent,
		AdminImageDetailComponent
	]
} )
export class AdminImagesModule { }
