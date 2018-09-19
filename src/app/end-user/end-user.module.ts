import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EndUserComponent } from './end-user/end-user.component';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { OurOffersComponent } from './our-offers/our-offers.component';

const routes: Routes = [
	{
		path: '', component: EndUserComponent, children: [
			{ path: '', component: FrontPageComponent },
			{ path: 'terms-of-service', component: TermsOfServiceComponent },
			{ path: 'signin', component: SignInComponent },
			{ path: 'signup', component: SignUpComponent },
			{ path: 'library', loadChildren: './library/library.module#LibraryModule' },
			{ path: 'our-offers', component: OurOffersComponent }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	],
	declarations: [
		EndUserComponent,
		FrontPageComponent,
		TermsOfServiceComponent,
		SignInComponent,
		SignUpComponent,
		NavbarComponent,
		FooterComponent,
		OurOffersComponent
	]
} )
export class EndUserModule { }
