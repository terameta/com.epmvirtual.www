import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNodesComponent } from './admin-nodes/admin-nodes.component';
import { AdminNodeListComponent } from './admin-node-list/admin-node-list.component';
import { AdminNodeDetailComponent } from './admin-node-detail/admin-node-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminNodeCandidatesComponent } from './admin-node-candidates/admin-node-candidates.component';
import { AdminNodeComponent } from './admin-node/admin-node.component';
import { AdminNodeConsoleComponent } from './admin-node-console/admin-node-console.component';
import { AdminNodeCommandsComponent } from './admin-node-commands/admin-node-commands.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AdminNodeOsComponent } from './admin-node-os/admin-node-os.component';
import { AdminNodeSystemComponent } from './admin-node-system/admin-node-system.component';
import { AdminNodeCpuComponent } from './admin-node-cpu/admin-node-cpu.component';
import { AdminNodeNicsComponent } from './admin-node-nics/admin-node-nics.component';
import { AdminNodeMemoryComponent } from './admin-node-memory/admin-node-memory.component';
import { AdminNodeDiskComponent } from './admin-node-disk/admin-node-disk.component';

const routes: Routes = [
	{
		path: '', component: AdminNodesComponent, children: [
			{ path: '', component: AdminNodeListComponent },
			{ path: 'candidates', component: AdminNodeCandidatesComponent },
			{
				path: ':id', component: AdminNodeComponent, children: [
					{ path: '', component: AdminNodeDetailComponent },
					{ path: 'console', component: AdminNodeConsoleComponent },
					{ path: 'commands', component: AdminNodeCommandsComponent },
					{ path: 'os', component: AdminNodeOsComponent },
					{ path: 'system', component: AdminNodeSystemComponent },
					{ path: 'cpu', component: AdminNodeCpuComponent },
					{ path: 'nics', component: AdminNodeNicsComponent },
					{ path: 'memory', component: AdminNodeMemoryComponent },
					{ path: 'disk', component: AdminNodeDiskComponent }

				]
			}
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule,
		BsDropdownModule,
		TooltipModule
	],
	declarations: [
		AdminNodesComponent,
		AdminNodeListComponent,
		AdminNodeDetailComponent,
		AdminNodeCandidatesComponent,
		AdminNodeComponent,
		AdminNodeConsoleComponent,
		AdminNodeCommandsComponent,
		AdminNodeOsComponent,
		AdminNodeSystemComponent,
		AdminNodeCpuComponent,
		AdminNodeNicsComponent,
		AdminNodeMemoryComponent,
		AdminNodeDiskComponent
	]
} )
export class AdminNodesModule { }
