import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(systemSettings.firebase),
		AppRoutingModule,
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
