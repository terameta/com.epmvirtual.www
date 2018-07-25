import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFrontPageComponent } from './admin-front-page/admin-front-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: AdminFrontPageComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ AdminFrontPageComponent ]
} )
export class AdminModule { }
