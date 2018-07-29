import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminSettingsGeneralComponent } from './admin-settings-general/admin-settings-general.component';
import { AdminSettingsParentComponent } from './admin-settings-parent/admin-settings-parent.component';
import { AdminSettingsPaypalComponent } from './admin-settings-paypal/admin-settings-paypal.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'general' },
	{ path: 'general', component: AdminSettingsGeneralComponent },
	{ path: 'paypal', component: AdminSettingsPaypalComponent }
]

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		AdminSettingsGeneralComponent,
		AdminSettingsParentComponent,
		AdminSettingsPaypalComponent
	]
} )
export class AdminSettingsModule { }
