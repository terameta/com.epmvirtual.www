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
import { ServersComponent } from './servers/servers.component';
import { ManagedServersComponent } from './managed-servers/managed-servers.component';
import { TemplatesComponent } from './templates/templates.component';
import { WhatIsATemplateComponent } from './what-is-a-template/what-is-a-template.component';
import { HyperionEssbaseComponent } from './hyperion-essbase/hyperion-essbase.component';
import { HyperionPlanningComponent } from './hyperion-planning/hyperion-planning.component';
import { HyperionHfmComponent } from './hyperion-hfm/hyperion-hfm.component';
import { HyperionRaComponent } from './hyperion-ra/hyperion-ra.component';
import { HyperionHpcmComponent } from './hyperion-hpcm/hyperion-hpcm.component';
import { HyperionDrmComponent } from './hyperion-drm/hyperion-drm.component';
import { HyperionFdmeeComponent } from './hyperion-fdmee/hyperion-fdmee.component';

const routes: Routes = [
	{
		path: '', component: EndUserComponent, children: [
			{ path: '', component: FrontPageComponent },
			{ path: 'terms-of-service', component: TermsOfServiceComponent },
			{ path: 'signin', component: SignInComponent },
			{ path: 'signup', component: SignUpComponent },
			{ path: 'library', loadChildren: './library/library.module#LibraryModule' },
			{ path: 'our-offers', component: OurOffersComponent },
			{ path: 'servers', component: ServersComponent },
			{ path: 'managed-servers', component: ManagedServersComponent },
			{ path: 'templates', component: TemplatesComponent },
			{ path: 'what-is-a-template', component: WhatIsATemplateComponent },
			{ path: 'hyperion-essbase', component: HyperionEssbaseComponent },
			{ path: 'hyperion-planning', component: HyperionPlanningComponent },
			{ path: 'hyperion-hfm', component: HyperionHfmComponent },
			{ path: 'hyperion-reporting-and-analysis', component: HyperionRaComponent },
			{ path: 'hyperion-profitability-and-cost-management', component: HyperionHpcmComponent },
			{ path: 'hyperion-drm', component: HyperionDrmComponent },
			{ path: 'hyperion-fdmee', component: HyperionFdmeeComponent }
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
		OurOffersComponent,
		ServersComponent,
		ManagedServersComponent,
		TemplatesComponent,
		WhatIsATemplateComponent,
		HyperionEssbaseComponent,
		HyperionPlanningComponent,
		HyperionHfmComponent,
		HyperionRaComponent,
		HyperionHpcmComponent,
		HyperionDrmComponent,
		HyperionFdmeeComponent
	]
} )
export class EndUserModule { }
