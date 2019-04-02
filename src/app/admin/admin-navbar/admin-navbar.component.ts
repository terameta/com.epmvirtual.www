import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';

@Component( {
	selector: 'app-admin-navbar',
	templateUrl: './admin-navbar.component.html',
	styleUrls: [ './admin-navbar.component.scss' ]
} )
export class AdminNavbarComponent implements OnInit {
	public concept$ = this.ss.concept$.pipe( map( c => this.toConceptTitle( c ) ) );

	isCollapsed = true;

	constructor(
		private as: AuthService,
		private router: Router,
		private ss: SharedService
	) { }

	ngOnInit() {
	}

	public signOut = () => {
		console.log( this.as );
		this.as.signout();
		this.router.navigate( [ '/signin' ] );
	}

	private toConceptTitle = ( c: string ) => {
		if ( c === 'datacenters' ) return { label: 'Data Centers', link: c };
		if ( c === 'storagepools' ) return { label: 'Storage Pools', link: c };
		if ( c === 'imagegroups' ) return { label: 'Image Groups', link: c };
		if ( c === 'ipblocks' ) return { label: 'IP Blocks', link: c };
		if ( c === 'isofiles' ) return { label: 'ISO Files', link: c };
		if ( c === 'mailtemplates' ) return { label: 'Mail Templates', link: c };
		return { label: c, link: c };
	}

}
