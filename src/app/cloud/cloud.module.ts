import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudFrontPageComponent } from './cloud-front-page/cloud-front-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: CloudFrontPageComponent }
]
@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ CloudFrontPageComponent ]
} )
export class CloudModule { }
