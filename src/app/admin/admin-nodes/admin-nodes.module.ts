import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNodesComponent } from './admin-nodes/admin-nodes.component';
import { AdminNodeListComponent } from './admin-node-list/admin-node-list.component';
import { AdminNodeDetailComponent } from './admin-node-detail/admin-node-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminNodeCandidatesComponent } from './admin-node-candidates/admin-node-candidates.component';

const routes: Routes = [
	{
		path: '', component: AdminNodesComponent, children: [
			{ path: '', component: AdminNodeListComponent },
			{ path: 'candidates', component: AdminNodeCandidatesComponent },
			{ path: ':id', component: AdminNodeDetailComponent }
		]
	}
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		FormsModule
	],
	declarations: [ AdminNodesComponent, AdminNodeListComponent, AdminNodeDetailComponent, AdminNodeCandidatesComponent ]
} )
export class AdminNodesModule { }
