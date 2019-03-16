import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailTemplatesComponent } from './mail-templates/mail-templates.component';
import { MailTemplateListComponent } from './mail-template-list/mail-template-list.component';
import { MailTemplateDetailComponent } from './mail-template-detail/mail-template-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

const routes: Routes = [
	{
		path: '', component: MailTemplatesComponent, children: [
			{ path: '', component: MailTemplateListComponent },
			{ path: ':id', component: MailTemplateDetailComponent }
		]
	}
];

@NgModule( {
	declarations: [ MailTemplatesComponent, MailTemplateListComponent, MailTemplateDetailComponent ],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild( routes ),
		MonacoEditorModule
	]
} )
export class MailTemplatesModule { }
