import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
	providedIn: 'root'
} )
export class AdminSharedService {
	public currentIDO: BehaviorSubject<string> = new BehaviorSubject( '' );
	public currentID = '';


	constructor(
		// private db: AngularFirestore,
		// private router: Router,
		private route: ActivatedRoute
	) {
		this.route.params.subscribe( params => {
			this.currentID = params.id;
			this.currentIDO.next( params.id );
		} );
		this.route.url.subscribe( console.log );
	}
}
