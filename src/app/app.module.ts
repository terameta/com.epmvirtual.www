import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '../../node_modules/angularfire2/firestore';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
	{ path: '', loadChildren: './end-user/end-user.module#EndUserModule' },
	{ path: 'admin', canActivate: [ AuthGuard ], data: { expectedRole: 'admin' }, loadChildren: './admin/admin.module#AdminModule' },
	{ path: 'cloud', canActivate: [ AuthGuard ], loadChildren: './cloud/cloud.module#CloudModule' }
];


@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AngularFireModule.initializeApp( systemSettings.firebase ),
		AngularFireAuthModule,
		AngularFirestoreModule,
		RouterModule.forRoot( routes ),
		SharedModule,
		ModalModule.forRoot()
	],
	exports: [
		FormsModule
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
