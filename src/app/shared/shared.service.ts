import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { Item, ItemType, getDefaultItem } from '../models/generic.models';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, Event, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable( {
	providedIn: 'root'
} )
export class SharedService {
	public cID = '';
	public cID$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public cURL = '';
	public cURL$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public cItem: Item = getDefaultItem();
	public cItem$: BehaviorSubject<Item> = new BehaviorSubject( getDefaultItem() );

	constructor(
		private db: AngularFirestore,
		private modalService: BsModalService,
		private router: Router
	) {
		this.router.events.subscribe( this.routeHandler );
	}

	private routeHandler = ( event: Event ) => {
		if ( event instanceof NavigationEnd ) {
			this.cURL = event.url;
			this.cURL$.next( this.cURL );
			const urlSegments = this.cURL.split( '/' );
			if ( urlSegments.length < 4 ) {
				this.cID = '';
			} else {
				this.cID = urlSegments[ 3 ];
			}
			this.cID$.next( this.cID );
		}
	}

	public confirm = ( question: string ) => {
		const modalRef: BsModalRef = this.modalService.show( ConfirmComponent, { initialState: { question } } );
		return new Promise( ( resolve, reject ) => {
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
	}

	public prompt = ( question: string, defaultValue = '' ): Promise<string> => {
		const modalRef: BsModalRef = this.modalService.show( PromptComponent, { initialState: { question, defaultValue } } );
		return new Promise( ( resolve, reject ) => {
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
	}

	public folderDelete = ( concept: string, id: string ) => {

	}

	public itemCreate = ( concept: string, details?: Partial<Item> ) => {
		this.prompt( 'What is the new folder name?' ).then( ( name: string ) => {
			if ( name ) {
				const item = { ...details, ...{ name } };
				this.db.collection( concept ).add( item ).catch( console.error );
			}
		} ).catch( console.log );
	}
}
