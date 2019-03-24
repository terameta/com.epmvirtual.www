import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers/servers.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { ServerListComponent } from './server-list/server-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: ServersComponent, children: [
			{ path: '', component: ServerListComponent },
			{ path: ':id', component: ServerDetailComponent }
		]
	}
];

@NgModule( {
	declarations: [ ServersComponent, ServerDetailComponent, ServerListComponent ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	]
} )
export class ServersModule { }
