import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { map } from 'rxjs/operators';
import { SortByName } from 'src/utilities/utilityFunctions';
import { IPBlock } from 'src/app/models/ipblock.models';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-ip-blocks',
	templateUrl: './ip-blocks.component.html',
	styleUrls: [ './ip-blocks.component.scss' ]
} )
export class IpBlocksComponent implements OnInit {
	public items$ = this.db.collection<IPBlock>( 'ipblocks' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<IPBlock>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	constructor(
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
	}

}
