import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';
import { IPBlock } from 'src/app/models/ipblock.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataCenter } from 'src/app/models/datacenter.models';
import { SortByName } from 'src/utilities/utilityFunctions';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-ip-block-detail',
	templateUrl: './ip-block-detail.component.html',
	styleUrls: [ './ip-block-detail.component.scss' ]
} )
export class IpBlockDetailComponent implements OnInit {
	public item$: Observable<IPBlock> = this.ss.cItem$.pipe(
		map( i => ( ( i as any ) as IPBlock ) ),
		// map( i => ( { ...i, requirements: i.requirements || {} } ) ),
		map( i => ( ( i as any ) as IPBlock ) )
	);

	public dcs$ = this.db.collection<DataCenter>( 'datacenters' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<DataCenter>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	public rangeStart = '10.0.0.16';
	public rangeEnd = '10.0.0.2';

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() { }

	public addIP = () => {
		if ( this.validIP4( this.rangeStart ) || this.validIP4( this.rangeEnd ) ) {
			if ( !this.validIP4( this.rangeStart ) ) this.rangeStart = this.rangeEnd;
			if ( !this.validIP4( this.rangeEnd ) ) this.rangeEnd = this.rangeStart;
			const rsA = this.rangeStart.split( '.' );
			const reA = this.rangeEnd.split( '.' );
			const rs = parseInt( rsA[ 0 ], 10 ) * 256 * 256 * 256 + parseInt( rsA[ 1 ], 10 ) * 256 * 256 + parseInt( rsA[ 2 ], 10 ) * 256 + parseInt( rsA[ 3 ], 10 );
			const re = parseInt( reA[ 0 ], 10 ) * 256 * 256 * 256 + parseInt( reA[ 1 ], 10 ) * 256 * 256 + parseInt( reA[ 2 ], 10 ) * 256 + parseInt( reA[ 3 ], 10 );

			let crs = 0;
			let cre = 0;
			if ( re > rs ) {
				crs = rs;
				cre = re;
			} else {
				crs = re;
				cre = rs;
			}

			console.log( crs, cre );
			for ( let x = crs; x <= cre; x++ ) {
				const ipParts: number[] = [ Math.floor( ( ( x / 256 ) / 256 ) / 256 ), Math.floor( ( x / 256 ) / 256 ), Math.floor( x / 256 ), x % 256 ];
				ipParts[ 1 ] -= ipParts[ 0 ] * 256;
				ipParts[ 2 ] -= ipParts[ 1 ] * 256 + ipParts[ 0 ] * 256 * 256;
				console.log( x, ipParts, ipParts.map( a => a.toString( 10 ) ).join( '.' ) );
			}

		} else {
			console.log( 'We will not add any IPs at this moment because there is nothing to add' );
		}
	}

	private validIP4( toCheck = '' ) {
		const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ( toCheck.match( ipformat ) );
	}

	private validMAC( toCheck = '' ) {
		const macformat = /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/;
		return ( macformat.test( toCheck ) );
	}

}
