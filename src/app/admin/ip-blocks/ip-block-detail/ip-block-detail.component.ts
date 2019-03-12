import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { map, tap, take } from 'rxjs/operators';
import { IPBlock, IPAddress } from 'src/app/models/ipblock.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataCenter } from 'src/app/models/datacenter.models';
import { SortByName, SortByIP } from 'src/utilities/utilityFunctions';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { Observable } from 'rxjs';

@Component( {
	selector: 'app-ip-block-detail',
	templateUrl: './ip-block-detail.component.html',
	styleUrls: [ './ip-block-detail.component.scss' ]
} )
export class IpBlockDetailComponent implements OnInit {
	public item$: Observable<IPBlock>;

	public dcs$ = this.db.collection<DataCenter>( 'datacenters' ).snapshotChanges().pipe(
		map( d => this.us.actions2Data<DataCenter>( d ) ),
		map( d => d.sort( SortByName ) )
	);

	public rangeStart = '';
	public rangeEnd = '';

	constructor(
		public ss: SharedService,
		private db: AngularFirestore,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.item$ = this.ss.cItem$.pipe(
			map( i => ( ( i as any ) as IPBlock ) ),
			// map( i => ( { ...i, requirements: i.requirements || {} } ) ),
			map( i => ( ( i as any ) as IPBlock ) ),
			tap( i => { if ( i.ips ) i.ips.sort( SortByIP ); } ),
			tap( this.checkMACS )
		);
	}

	public addIP = ( item: IPBlock ) => {
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

			if ( !item.ips ) item.ips = [];

			for ( let x = crs; x <= cre; x++ ) {
				const ipParts: number[] = [ Math.floor( ( ( x / 256 ) / 256 ) / 256 ), Math.floor( ( x / 256 ) / 256 ), Math.floor( x / 256 ), x % 256 ];
				ipParts[ 1 ] -= ipParts[ 0 ] * 256;
				ipParts[ 2 ] -= ipParts[ 1 ] * 256 + ipParts[ 0 ] * 256 * 256;
				item.ips.push( { ip: ipParts.map( a => a.toString( 10 ) ).join( '.' ), mac: '', assigned: false } );
			}

			this.db.doc( 'ipblocks/' + item.id ).update( item );
		} else {
			console.log( 'We will not add any IPs at this moment because there is nothing to add' );
		}
	}

	private validIP4( toCheck = '' ) {
		const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		return ( toCheck.match( ipformat ) );
	}

	// private validMAC( toCheck = '' ) {
	// 	const macformat = /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/;
	// 	return ( macformat.test( toCheck ) );
	// }

	private checkMACS = ( payload: IPBlock ) => {
		const existingMacs: string[] = [];
		if ( payload.ips ) {
			if ( payload.ips.filter( i => i.mac === '' || !i.mac ).length > 0 ) {
				this.db.collection<IPBlock>( 'ipblocks' ).valueChanges().pipe( take( 1 ) ).subscribe( blocks => {
					blocks.forEach( b => {
						if ( b.ips && Array.isArray( b.ips ) ) {
							b.ips.forEach( i => {
								if ( i.mac && i.mac !== '' ) existingMacs.push( i.mac );
							} );
						}
					} );
					payload.ips.forEach( ip => {
						if ( ip.mac === '' || !ip.mac ) ip.mac = this.generateMAC( existingMacs );
					} );
					console.log( 'We needed to generate MAC addresses' );
					this.db.doc( 'ipblocks/' + payload.id ).update( payload );
				} );
			}
		}
	}

	private generateMAC( existings: string[] ) {
		let curMac = '';
		while ( true ) {
			const octets = [ '52', '54', '00' ];
			let curOctet = '00';
			curMac = '';
			for ( let i = 0; i < 3; i++ ) {
				curOctet = Math.floor( Math.random() * ( 255 - 1 ) + 1 ).toString( 16 ).toUpperCase();
				curOctet = '0' + curOctet;
				curOctet = curOctet.substr( curOctet.length - 2 );
				octets.push( curOctet );
			}
			curMac = octets.join( ':' );
			let shouldReturn = true;
			existings.forEach( ( curComp ) => {
				if ( curComp === curMac ) shouldReturn = false;
			} );
			if ( shouldReturn ) break;
		}
		return curMac;
	}

	public deleteIP = async ( item: IPBlock, toDelete: IPAddress ) => {
		if ( await this.ss.confirm( 'Are you sure?' ) ) {
			item.ips = item.ips.filter( ip => ip.ip !== toDelete.ip );
			this.db.doc( 'ipblocks/' + item.id ).update( item );
		}
	}
}
