import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { systemSettings } from './app.settings';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from './shared/shared.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{ path: '', component: FrontPageComponent },
	{ path: 'terms-of-service', component: TermsOfServiceComponent },
	{ path: 'signin', component: SignInComponent },
	{ path: 'signup', component: SignUpComponent }
];


@NgModule({
	declarations: [
		AppComponent,
		FrontPageComponent,
		TermsOfServiceComponent,
		SignInComponent,
		SignUpComponent,
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
