import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { MailTemplate, MailTemplateType } from 'src/app/models/mailtemplate.models';
import { map } from 'rxjs/operators';
import { enum2array } from 'src/utilities/utilityFunctions';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component( {
	selector: 'app-mail-template-detail',
	templateUrl: './mail-template-detail.component.html',
	styleUrls: [ './mail-template-detail.component.scss' ]
} )
export class MailTemplateDetailComponent implements OnInit {
	public types = enum2array( MailTemplateType );

	public item$: Observable<MailTemplate> = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as MailTemplate ) ),
	);

	private editor: any;

	editorOptions = {
		theme: 'vs-light',
		language: 'html',
		automaticLayout: true, minimap: {
			enabled: false
		}
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
		private us: UtilitiesService
	) { }

	ngOnInit() { }

}
