import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPlansListComponent } from './admin-plans-list/admin-plans-list.component';
import { AdminPlansDetailComponent } from './admin-plans-detail/admin-plans-detail.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: AdminPlansComponent, children: [
			{ path: '', component: AdminPlansListComponent },
			{ path: ':id', component: AdminPlansDetailComponent }
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
		AdminPlansListComponent,
		AdminPlansDetailComponent,
		AdminPlansComponent
	]
} )
export class AdminPlansModule { }
