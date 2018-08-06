import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLibrarySidenavComponent } from './admin-library-sidenav/admin-library-sidenav.component';
import { TreeModule } from 'angular-tree-component';

const routes: Routes = [
	{ path: '', component: AdminLibraryComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		TreeModule
	],
	declarations: [ AdminLibraryComponent, AdminLibrarySidenavComponent ]
} )
export class AdminLibraryModule { }
