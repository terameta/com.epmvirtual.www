import { Component, OnInit } from '@angular/core';
import { MailTemplate } from 'src/app/models/mailtemplate.models';
import { SortByName } from 'src/utilities/utilityFunctions';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';

@Component( {
	selector: 'app-mail-template-list',
	templateUrl: './mail-template-list.component.html',
	styleUrls: [ './mail-template-list.component.scss' ]
} )
export class MailTemplateListComponent implements OnInit {
	public items$ = this.db.collection<MailTemplate>( 'mailtemplates' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<MailTemplate>( d ).sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

	public create = async () => {
		const name = await this.ss.prompt( 'Name?', 'New Item' );
		if ( name ) {
			const result = await this.db.collection( 'mailtemplates' ).add( { name } );
			this.us.navigateByUrl( '/admin/mailtemplates/' + result.id );
		}
	}

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'mailtemplates/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}


}
