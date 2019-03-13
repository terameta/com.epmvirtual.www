import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsoFilesComponent } from './iso-files/iso-files.component';
import { IsoFileListComponent } from './iso-file-list/iso-file-list.component';
import { IsoFileDetailComponent } from './iso-file-detail/iso-file-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: IsoFilesComponent, children: [
			{ path: '', component: IsoFileListComponent },
			{ path: ':id', component: IsoFileDetailComponent }
		]
	}
];

@NgModule( {
	declarations: [ IsoFilesComponent, IsoFileListComponent, IsoFileDetailComponent ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes )
	]
} )
export class IsoFilesModule { }
