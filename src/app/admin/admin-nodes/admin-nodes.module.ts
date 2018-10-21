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

const routes: Routes = [
	{
		path: '', component: AdminNodesComponent, children: [
			{ path: '', component: AdminNodeListComponent },
			{ path: 'candidates', component: AdminNodeCandidatesComponent },
			{
				path: ':id', component: AdminNodeComponent, children: [
					{ path: '', component: AdminNodeDetailComponent },
					{ path: 'console', component: AdminNodeConsoleComponent }
				]
			}
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule
	],
	declarations: [
		AdminNodesComponent,
		AdminNodeListComponent,
		AdminNodeDetailComponent,
		AdminNodeCandidatesComponent,
		AdminNodeComponent,
		AdminNodeConsoleComponent
	]
} )
export class AdminNodesModule { }
