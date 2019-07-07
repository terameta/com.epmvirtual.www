import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleFrontPageComponent } from './console-front-page/console-front-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: ConsoleFrontPageComponent }
]
@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ ConsoleFrontPageComponent ]
} )
export class ConsoleModule { }
