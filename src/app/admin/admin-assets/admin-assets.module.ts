import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAssetsComponent } from './admin-assets/admin-assets.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: AdminAssetsComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ AdminAssetsComponent ]
} )
export class AdminAssetsModule { }
