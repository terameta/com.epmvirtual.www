import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { IPBlock } from 'src/app/models/ipblock.models';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';

@Component( {
	selector: 'app-ip-block-list',
	templateUrl: './ip-block-list.component.html',
	styleUrls: [ './ip-block-list.component.scss' ]
} )
export class IpBlockListComponent implements OnInit {
	public items$ = this.db.collection<IPBlock>( 'ipblocks' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<IPBlock>( d ) ),
		map( d => d.sort( SortByName ) )
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
			const result = await this.db.collection( 'ipblocks' ).add( { name } );
			this.us.navigateByUrl( '/admin/ipblocks/' + result.id );
		}
	}

	public delete = async ( id: string ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			await this.db.doc( 'ipblocks/' + id ).delete();
			console.log( 'Delete succeded' );
		}
	}

}
