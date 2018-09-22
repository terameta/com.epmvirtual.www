import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable( {
	providedIn: 'root'
} )
export class AuthService {
	public user: Observable<firebase.User> = null;
	public userDetails: firebase.User = null;
	public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject( localStorage.getItem( 'isAuthenticated' ) === 'true' );

	constructor(
		private afAuth: AngularFireAuth
	) {
		this.user = this.afAuth.authState;
		this.userDetails = !!localStorage.getItem( 'userDetails' ) ? JSON.parse( localStorage.getItem( 'userDetails' ) ) : null;
		this.afAuth.authState.subscribe( nextUser => {
			this.userDetails = nextUser;
			this.isAuthenticated$.next( !!this.userDetails );
			localStorage.setItem( 'isAuthenticated', ( !!this.userDetails ).toString() );
			localStorage.setItem( 'userDetails', JSON.stringify( this.userDetails ) );
		} );
	}

	signup = ( email: string, password: string ) => {

	}

	public signin = ( email: string, password: string ) => this.afAuth.auth.signInWithEmailAndPassword( email, password );
	public signout = () => this.afAuth.auth.signOut();
}
