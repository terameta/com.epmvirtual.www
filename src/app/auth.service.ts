import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable( {
	providedIn: 'root'
} )
export class AuthService {
	public user: Observable<firebase.User> = null;
	public userDetails: firebase.User = null;

	constructor(
		private afAuth: AngularFireAuth
	) {
		this.user = this.afAuth.authState;
		this.afAuth.authState.subscribe( nextUser => { this.userDetails = nextUser; } );
	}

	signup = ( email: string, password: string ) => {

	}

	public signin = ( email: string, password: string ) => this.afAuth.auth.signInWithEmailAndPassword( email, password );
	public signout = () => this.afAuth.auth.signOut();
}
