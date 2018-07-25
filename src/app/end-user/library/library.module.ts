import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: 'library', component: LibraryComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ LibraryComponent ]
} )
export class LibraryModule { }
