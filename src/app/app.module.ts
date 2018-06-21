import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from './shared/shared.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: FrontPageComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		FrontPageComponent,
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(systemSettings.firebase),
		RouterModule.forRoot(routes),
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
