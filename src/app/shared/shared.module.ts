import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		NavbarComponent,
		FooterComponent
	],
	declarations: [NavbarComponent, FooterComponent]
})
export class SharedModule { }
