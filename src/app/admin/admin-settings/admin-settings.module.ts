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
import { AdminSettingsFacebookComponent } from './admin-settings-facebook/admin-settings-facebook.component';
import { AdminSettingsTwitterComponent } from './admin-settings-twitter/admin-settings-twitter.component';
import { AdminSettingsGoogleComponent } from './admin-settings-google/admin-settings-google.component';
import { AdminSettingsLinkedinComponent } from './admin-settings-linkedin/admin-settings-linkedin.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'general' },
	{ path: 'general', component: AdminSettingsGeneralComponent },
	{ path: 'paypal', component: AdminSettingsPaypalComponent },
	{ path: '2co', component: AdminSettingsTwocoComponent },
	{ path: 'smtp', component: AdminSettingsSmtpComponent },
	{ path: 'sparkpost', component: AdminSettingsSparkpostComponent },
	{ path: 'twitter', component: AdminSettingsTwitterComponent },
	{ path: 'facebook', component: AdminSettingsFacebookComponent },
	{ path: 'google', component: AdminSettingsGoogleComponent },
	{ path: 'linkedin', component: AdminSettingsLinkedinComponent }
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
		AdminSettingsSparkpostComponent,
		AdminSettingsFacebookComponent,
		AdminSettingsTwitterComponent,
		AdminSettingsGoogleComponent,
		AdminSettingsLinkedinComponent
	]
} )
export class AdminSettingsModule { }
