import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpBlocksComponent } from './ip-blocks/ip-blocks.component';
import { IpBlockDetailComponent } from './ip-block-detail/ip-block-detail.component';
import { IpBlockListComponent } from './ip-block-list/ip-block-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: IpBlocksComponent, children: [
			{ path: '', component: IpBlockListComponent },
			{ path: ':id', component: IpBlockDetailComponent }
		]
	}
];

@NgModule( {
	declarations: [ IpBlocksComponent, IpBlockDetailComponent, IpBlockListComponent ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	]
} )
export class IpBlocksModule { }
