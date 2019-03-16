import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MailTemplate } from 'src/app/models/mailtemplate.models';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-mail-templates',
	templateUrl: './mail-templates.component.html',
	styleUrls: [ './mail-templates.component.scss' ]
} )
export class MailTemplatesComponent implements OnInit {
	public items$ = this.db.collection<MailTemplate>( 'mailtemplates' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<MailTemplate>( d ).sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
