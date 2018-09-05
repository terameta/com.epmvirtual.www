import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { UploadComponent } from './upload/upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ChangeParentComponent } from './change-parent/change-parent.component';
import { ChangeParentDisplayerComponent } from './change-parent-displayer/change-parent-displayer.component';
import { AssetSelectorComponent } from './asset-selector/asset-selector.component';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule,
		ProgressbarModule
	],
	providers: [
		SharedService
	],
	declarations: [
		ConfirmComponent,
		PromptComponent,
		UploadComponent,
		ChangeParentComponent,
		ChangeParentDisplayerComponent,
		AssetSelectorComponent
	],
	entryComponents: [
		AssetSelectorComponent,
		ChangeParentComponent,
		ConfirmComponent,
		PromptComponent,
		UploadComponent
	]
} )
export class SharedModule { }
