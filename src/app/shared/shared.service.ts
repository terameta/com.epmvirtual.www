import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { Item, ItemType, getDefaultItem } from '../models/generic.models';
import { AngularFirestore, DocumentSnapshot, Action } from 'angularfire2/firestore';
import { Router, Event, NavigationEnd, NavigationExtras } from '@angular/router';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { debounce, take, map } from 'rxjs/operators';
import { UploadComponent } from './upload/upload.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { Asset } from '../models/asset.models';

@Injectable( {
	providedIn: 'root'
} )
export class SharedService {
	public cID$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public cURL$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public cItem$: BehaviorSubject<Item> = new BehaviorSubject( getDefaultItem() );
	public concept$: BehaviorSubject<string> = new BehaviorSubject( '' );
	public shouldShowHeader = true;
	public shouldShowFooter = true;

	public selectedItems: string[] = [];

	private dbURL$: BehaviorSubject<string> = new BehaviorSubject( '' );

	private itemSubscription: Subscription;

	constructor(
		private db: AngularFirestore,
		private storage: AngularFireStorage,
		private modalService: BsModalService,
		private router: Router
	) {
		this.router.events.subscribe( this.routeHandler );
		this.dbURL$.pipe( debounce( () => timer( 100 ) ) ).subscribe( this.dburlHandler );
	}

	private dburlHandler = ( cstr: string ) => {
		if ( this.itemSubscription ) this.itemSubscription.unsubscribe();
		if ( cstr !== '' ) {
			this.itemSubscription = this.db.doc( cstr ).snapshotChanges().subscribe( this.itemHandler );
		} else {
			this.itemSubscription = null;
			this.cItem$.next( getDefaultItem() );
		}
	}

	private itemHandler = ( iAction: Action<DocumentSnapshot<Item>> ) => {
		this.cItem$.next( { ...iAction.payload.data(), ...{ id: iAction.payload.id } } );
	}

	private routeHandler = ( event: Event ) => {
		if ( event instanceof NavigationEnd ) {
			this.cURL$.next( event.urlAfterRedirects );
			this.dbURL$.next( '' );
			this.urlAct();
		}
	}

	private urlAct = () => {
		const urlSegments = this.cURL$.getValue().split( '/' );
		if ( urlSegments[ 0 ] === '' ) urlSegments.splice( 0, 1 );
		if ( urlSegments[ 0 ] === 'admin' ) {
			this.urlActOnAdmin( urlSegments );
		} else if ( urlSegments[ 0 ] === 'cloud' ) {
			this.urlActOnCloud( urlSegments );
		} else {
			this.urlActOnEndUser( urlSegments );
		}
		this.urlActOnGeneral( urlSegments );
	}

	private urlActOnAdmin = ( urlSegments: string[] ) => {
		this.concept$.next( urlSegments[ 1 ] || '' );
		this.cID$.next( urlSegments[ 2 ] || '0' );
		this.selectedItems = [];
		this.dbURL$.next( this.cURL$.getValue().replace( '/admin', '' ) );
	}

	private urlActOnCloud = ( urlSegments: string[] ) => {

	}

	private urlActOnEndUser = ( urlSegments: string[] ) => {

	}

	private urlActOnGeneral = ( urlSegments: string[] ) => {
		if ( this.cURL$.getValue() === '/signin' ) {
			this.shouldShowHeader = false;
			this.shouldShowFooter = false;
		} else {
			this.shouldShowHeader = true;
			this.shouldShowFooter = true;
		}
	}

	public confirm = ( question: string ): Promise<boolean> => {
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

	public itemCreate = async ( payload: { concept?: string, details: Partial<Item> } ) => {
		if ( !payload.details.parent ) payload.details.parent = this.cID$.getValue();
		if ( !payload.concept ) payload.concept = this.concept$.getValue();
		if ( !payload.details.name ) payload.details.name = await this.prompt( 'Name?' );
		if ( !payload.details.name ) payload.details.name = '-';
		if ( !payload.details.id ) payload.details.id = this.db.createId();
		await this.db.doc( payload.concept + '/' + payload.details.id ).set( payload.details ).catch( console.error );
	}

	public itemUpload = ( payload: { concept?: string, details: Partial<Item> } ) => {
		const modalRef: BsModalRef = this.modalService.show( UploadComponent, { initialState: { parentID: this.cID$.getValue() } } );
		modalRef.content.onUpload.subscribe( i => this.itemCreate( { concept: 'assets', details: i } ) );
		return new Promise( ( resolve, reject ) => {
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
	}

	public save = ( item ) => this.db.doc( this.dbURL$.getValue() ).set( item );
	public update = ( item ) => this.db.doc( this.dbURL$.getValue() ).update( item );
	public deleteSelected = async () => {
		const shouldWe = await this.confirm( 'Are you sure?' );
		if ( shouldWe === true ) {
			for ( const id of this.selectedItems ) {
				await this.delete( id, false );
			}
			this.selectedItems = [];
		}
	}
	public delete = async ( id?: string, shouldConfirm = true ): Promise<any> => {
		let confirmed = false;
		if ( shouldConfirm ) confirmed = await this.confirm( 'Are you sure?' );
		if ( !shouldConfirm ) confirmed = true;
		if ( confirmed ) {
			return new Promise( ( resolve, reject ) => {
				if ( !id ) id = this.cID$.getValue();
				this.db.collection( this.concept$.getValue() ).
					snapshotChanges().
					pipe(
						take( 1 ),
						map( i => i.map( a => ( a.payload.doc ) ) ),
						map( i => i.map( a => ( { ...a.data(), ...{ id: a.id } } ) ) )
					).
					subscribe( ( items: any[] ) => {
						this.deleteAction( id, items ).then( () => resolve() ).catch( reject );
					} );
			} );
		}
	}

	private deleteAction = async ( id: string, items: any[] ): Promise<void> => {
		if ( items.filter( a => a.id === id )[ 0 ].type === ItemType.folder ) {
			await this.deleteFolder( id, items );
		} else {
			await this.deleteItem( id, items );
		}
	}

	private deleteFolder = async ( id: string, items: any[] ) => {
		for ( const item of items.filter( i => i.parent === id ) ) {
			await this.deleteAction( item.id, items );
		}
		await this.deleteItem( id, items );
	}

	private deleteItem = async ( id: string, items: any[] ) => {
		const item = items.find( i => i.id === id );
		if ( item.type === ItemType.asset && item.storageAddress ) {
			await this.storage.ref( item.storageAddress ).delete().toPromise().catch( console.error );
		}
		await this.db.doc( this.concept$.getValue() + '/' + id ).delete().catch( console.error );
	}

	public unsub = ( subscriptions: Subscription[] ) => subscriptions.forEach( s => { s.unsubscribe(); s = null; } );
	public getsubs = () => <Subscription[]>[];

}
