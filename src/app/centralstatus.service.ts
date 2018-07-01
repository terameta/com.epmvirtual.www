import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable( {
	providedIn: 'root'
} )
export class CentralStatusService {
	public currentURL = '';
	public shouldShowHeader = true;
	public shouldShowFooter = true;

	constructor( private router: Router ) {
		router.events.subscribe( this.routeHandler );
	}


	private routeHandler = ( event ) => {
		if ( event instanceof NavigationEnd ) {
			this.currentURL = event.url;
			this.shouldShowHeader = true;
			this.shouldShowFooter = true;
			if ( this.currentURL === '/signin' ) { this.shouldShowHeader = false; }
			if ( this.currentURL === '/signin' ) { this.shouldShowFooter = false; }
			// console.log( 'Current URL:', event.url );
		}
	}
}
