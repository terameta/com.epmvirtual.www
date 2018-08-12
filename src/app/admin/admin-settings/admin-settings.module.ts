import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminSettingsGeneralComponent } from './admin-settings-general/admin-settings-general.component';
import { AdminSettingsParentComponent } from './admin-settings-parent/admin-settings-parent.component';
import { AdminSettingsPaypalComponent } from './admin-settings-paypal/admin-settings-paypal.component';
import { AdminSettingsTwocoComponent } from './admin-settings-twoco/admin-settings-twoco.component';
import { AdminSettingsSmtpComponent } from './admin-settings-smtp/admin-settings-smtp.component';
import { AdminSettingsSparkpostComponent } from './admin-settings-sparkpost/admin-settings-sparkpost.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'general' },
	{ path: 'general', component: AdminSettingsGeneralComponent },
	{ path: 'paypal', component: AdminSettingsPaypalComponent },
	{ path: '2co', component: AdminSettingsTwocoComponent },
	{ path: 'smtp', component: AdminSettingsSmtpComponent },
	{ path: 'sparkpost', component: AdminSettingsSparkpostComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		AdminSettingsGeneralComponent,
		AdminSettingsParentComponent,
		AdminSettingsPaypalComponent,
		AdminSettingsTwocoComponent,
		AdminSettingsSmtpComponent,
		AdminSettingsSparkpostComponent
	]
} )
export class AdminSettingsModule { }
