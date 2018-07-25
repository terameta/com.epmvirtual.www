import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { AngularFireModule } from 'angularfire2';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes: Routes = [
	{ path: '', loadChildren: './end-user/end-user.module#EndUserModule' },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
	{ path: 'cloud', loadChildren: './cloud/cloud.module#CloudModule' }
];


@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition( { appId: 'www-epmvirtual-com' } ),
		FormsModule,
		AngularFireModule.initializeApp( systemSettings.firebase ),
		AngularFireAuthModule,
		RouterModule.forRoot( routes )
	],
	exports: [
		FormsModule
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
