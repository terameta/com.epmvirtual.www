import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataCenterComponent } from './admin-datacenter/admin-datacenter.component';
import { AdminDataCenterListComponent } from './admin-datacenter-list/admin-datacenter-list.component';
import { AdminDataCentersComponent } from './admin-datacenters/admin-datacenters.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: AdminDataCentersComponent, children: [
			{ path: '', component: AdminDataCenterListComponent },
			{ path: ':id', component: AdminDataCenterComponent }
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
		AdminDataCenterComponent,
		AdminDataCenterListComponent,
		AdminDataCentersComponent
	]
} )
export class AdminDataCentersModule { }
