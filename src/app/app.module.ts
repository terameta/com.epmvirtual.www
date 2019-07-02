import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '../../node_modules/@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { SharedModule } from './shared/shared.module';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
	{ path: '', loadChildren: './end-user/end-user.module#EndUserModule' },
	{ path: 'admin', canActivate: [ AuthGuardService ], data: { expectedRole: 'admin' }, loadChildren: './admin/admin.module#AdminModule' },
	{ path: 'cloud', canActivate: [ AuthGuardService ], loadChildren: './cloud/cloud.module#CloudModule' }
];


@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
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
		MonacoEditorModule.forRoot(),
		TooltipModule.forRoot(),
		BrowserAnimationsModule
	],
	exports: [
		FormsModule
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
