import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: '', component: ProfileComponent }
];

@NgModule( {
	declarations: [ ProfileComponent ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	]
} )
export class ProfileModule { }
