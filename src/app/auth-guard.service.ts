import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable( { providedIn: 'root' } )
export class AuthGuardService {

	constructor( private as: AuthService, private router: Router ) { }

	public canActivate( route: ActivatedRouteSnapshot ): boolean {
		// console.log( 'Buradayız' );
		// console.log( route.data.expectedRole );
		// console.log( this.as.userDetails );
		// console.log( this.as.isAuthenticated$.getValue() );
		if ( !this.as.isAuthenticated$.getValue() ) {
			this.router.navigate( [ '/signin' ] );
			return false;
		}
		if ( route.data.expectedRole && route.data.expectedRole === 'admin' && this.as.userDetails.uid !== '0Jc2AjwYPMPo5G7oF2FfZbEFNi03' ) {
			this.router.navigate( [ '/signin' ] );
			return false;
		}
		return true;
	}
}
