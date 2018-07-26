import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AdminComponent } from './admin/admin.component';
import { AdminFrontPageComponent } from './admin-front-page/admin-front-page.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

const routes: Routes = [
	{
		path: '', component: AdminComponent, children: [
			{ path: '', component: AdminFrontPageComponent }
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
