import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
	providedIn: 'root'
} )
export class AdminSharedService {
	public currentID$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public currentID = '';
	public currentURL = '';
	public currentURL$: BehaviorSubject<string> = new BehaviorSubject( '' );


	constructor(
		// private db: AngularFirestore,
		private router: Router
	) {
		this.router.events.subscribe( this.routeHandler );
	}

	private routeHandler = ( event: Event ) => {
		if ( event instanceof NavigationEnd ) {
			this.currentURL = event.url;
			this.currentURL$.next( this.currentURL );
			const urlSegments = this.currentURL.split( '/' );
			if ( urlSegments.length < 4 ) {
				this.currentID = '';
			} else {
				this.currentID = urlSegments[ 3 ];
			}
			this.currentID$.next( this.currentID );
		}
	}
}
