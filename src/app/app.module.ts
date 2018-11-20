import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '../../node_modules/@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { SharedModule } from './shared/shared.module';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

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
		AngularFireStorageModule,
		RouterModule.forRoot( routes ),
		SharedModule,
		ModalModule.forRoot(),
		ProgressbarModule.forRoot(),
		BsDropdownModule.forRoot(),
		MonacoEditorModule.forRoot()
	],
	exports: [
		FormsModule
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
