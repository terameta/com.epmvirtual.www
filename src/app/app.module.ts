import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
	{ path: '', loadChildren: () => import( './end-user/end-user.module' ).then( m => m.EndUserModule ) },
	{ path: 'admin', canActivate: [ AuthGuardService ], data: { expectedRole: 'admin' }, loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule ) },
	{ path: 'console', canActivate: [ AuthGuardService ], loadChildren: () => import( './console/console.module' ).then( m => m.ConsoleModule ) }
	// { path: '', loadChildren: './end-user/end-user.module#EndUserModule' },
	// 	{ path: 'admin', canActivate: [ AuthGuardService ], data: { expectedRole: 'admin' }, loadChildren: './admin/admin.module#AdminModule' },
	// { path: 'console', canActivate: [ AuthGuardService ], loadChildren: './console/console.module#ConsoleModule' }
];

// const routes: Routes = [
// 	{
// 		path: 'lazy',
// 		loadChildren: './lazy/lazy.module#LazyModule', // use this syntax for non-ivy or Angular 7 and below
// 		loadChildren: () => import( './lazy/lazy.module' ).then( m => m.LazyModule ), // new dynamic import method
// 	}
// ];


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
