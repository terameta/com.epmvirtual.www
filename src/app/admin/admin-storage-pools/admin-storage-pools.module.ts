import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStoragePoolsComponent } from './admin-storage-pools/admin-storage-pools.component';
import { AdminStoragePoolComponent } from './admin-storage-pool/admin-storage-pool.component';
import { AdminStoragePoolListComponent } from './admin-storage-pool-list/admin-storage-pool-list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: AdminStoragePoolsComponent, children: [
			{ path: '', component: AdminStoragePoolListComponent },
			{ path: ':id', component: AdminStoragePoolComponent }
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
		AdminStoragePoolsComponent,
		AdminStoragePoolComponent,
		AdminStoragePoolListComponent
	]
} )
export class AdminStoragePoolsModule { }
