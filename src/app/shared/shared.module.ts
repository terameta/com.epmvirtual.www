import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { UploadComponent } from './upload/upload.component';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [
		SharedService
	],
	declarations: [
		ConfirmComponent,
		PromptComponent,
		UploadComponent
	],
	entryComponents: [
		ConfirmComponent,
		PromptComponent,
		UploadComponent
	]
} )
export class SharedModule { }
