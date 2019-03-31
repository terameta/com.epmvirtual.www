import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers/servers.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { ServerListComponent } from './server-list/server-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServerMainInformationComponent } from './server-main-information/server-main-information.component';
import { ServerConsoleComponent } from './server-console/server-console.component';
import { ServerConnectionDetailsComponent } from './server-connection-details/server-connection-details.component';
import { ServerMigrationComponent } from './server-migration/server-migration.component';

const routes: Routes = [
	{
		path: '', component: ServersComponent, children: [
			{ path: '', component: ServerListComponent },
			{
				path: ':id', component: ServerDetailComponent, children: [
					{ path: '', component: ServerMainInformationComponent },
					{ path: 'console', component: ServerConsoleComponent },
					{ path: 'connectiondetails', component: ServerConnectionDetailsComponent },
					{ path: 'migration', component: ServerMigrationComponent }
				]
			}
		]
	}
];

@NgModule( {
	declarations: [
		ServersComponent,
		ServerDetailComponent,
		ServerListComponent,
		ServerMainInformationComponent,
		ServerConsoleComponent,
		ServerConnectionDetailsComponent,
		ServerMigrationComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	]
} )
export class ServersModule { }
