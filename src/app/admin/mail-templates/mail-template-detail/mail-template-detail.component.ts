import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { MailTemplate, MailTemplateType } from 'src/app/models/mailtemplate.models';
import { map, tap } from 'rxjs/operators';
import { enum2array } from 'src/utilities/utilityFunctions';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { systemSettings } from 'src/app/app.settings';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component( {
	selector: 'app-mail-template-detail',
	templateUrl: './mail-template-detail.component.html',
	styleUrls: [ './mail-template-detail.component.scss' ]
} )
export class MailTemplateDetailComponent implements OnInit {
	public settings = systemSettings;
	public types = enum2array( MailTemplateType );
	public trustedUrl: SafeUrl = null;

	public item$: Observable<MailTemplate> = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as MailTemplate ) ),
		tap( i => {
			const u = 'https://us-central1-' + this.settings.firebase.projectId + '.cloudfunctions.net/previewMailTemplate?id=' + i.id + '&time=' + ( new Date() ).getTime();
			// const u = '';
			this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl( u );
			console.log( this.trustedUrl );
		} )
	);

	private editor: any;

	editorOptions = {
		theme: 'vs-light',
		language: 'html',
		tabSize: 2,
		automaticLayout: true,
		minimap: { enabled: false }
	};

	public setEditor = ( item: MailTemplate, uiEditor: any, f: NgForm ) => {
		this.editor = uiEditor;
		// tslint:disable-next-line:no-bitwise
		this.editor.addCommand( [ monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S ], () => {
			f.form.markAsPristine();
			this.ss.save( item, f );
		} );
	}

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService,
		private sanitizer: DomSanitizer
	) { }

	ngOnInit() { }

}
