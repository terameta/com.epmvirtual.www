import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { Item, ItemType, getDefaultItem } from '../models/generic.models';
import { AngularFirestore, DocumentSnapshot, Action } from 'angularfire2/firestore';
import { Router, Event, NavigationEnd, NavigationExtras } from '@angular/router';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { debounce, take, map, tap } from 'rxjs/operators';
import { UploadComponent } from './upload/upload.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AdminSettingsService } from '../admin/admin-settings/admin-settings.service';
import { Article } from '../models/library.models';
import { SortByPosition } from '../../utilities/utilityFunctions';
import { ChangeParentComponent } from './change-parent/change-parent.component';
import { NgForm } from '@angular/forms';
import { AssetSelectorComponent } from './asset-selector/asset-selector.component';

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
		private adminSettingsService: AdminSettingsService,
		private router: Router
	) {
		this.router.events.subscribe( this.routeHandler );
		this.dbURL$.pipe( debounce( () => timer( 100 ) ) ).subscribe( this.dburlHandler );
	}

	private dburlHandler = ( cstr: string ) => {
		if ( this.itemSubscription ) this.itemSubscription.unsubscribe();
		if ( cstr !== '' ) {
			cstr = cstr.split( '/' ).splice( 0, 3 ).join( '/' );
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
			this.selectedItems = [];
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
		this.dbURL$.next( this.cURL$.getValue().replace( '/admin', '' ).split( '/' ).splice( 0, 3 ).join( '/' ) );
		// this.dbURL$.next( this.cURL$.getValue().replace( '/admin', '' ) );
	}

	private urlActOnCloud = ( urlSegments: string[] ) => {

	}

	private urlActOnEndUser = ( urlSegments: string[] ) => {
		this.concept$.next( urlSegments[ 0 ] || '' );
		this.cID$.next( urlSegments[ 1 ] || '0' );
		if ( urlSegments.length === 2 ) {
			this.dbURL$.next( urlSegments.join( '/' ) );
		} else {
			this.dbURL$.next( '' );
		}
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
		if ( payload.concept === 'library' ) {
			payload.details.id = ( await this.adminSettingsService.counterIncrement( 'article', 1 ) ).toString();
		}
		await this.db.doc( payload.concept + '/' + payload.details.id ).set( payload.details ).catch( console.error );
	}

	public itemUpload = ( payload: { concept?: string, details: Partial<Item> } ) => {
		const modalRef: BsModalRef = this.modalService.show( UploadComponent, { initialState: { parentID: this.cID$.getValue() } } );
		modalRef.content.onUpload.subscribe( i => this.itemCreate( { concept: 'assets', details: i } ) );
		return new Promise( ( resolve, reject ) => {
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
	}

	public save = async ( item, form?: NgForm ) => {
		if ( this.concept$.getValue() === 'library' ) {
			( item as Article ).lastUpdatedOn = new Date();
		}
		await this.db.doc( this.dbURL$.getValue() ).set( item );
		if ( form ) form.form.markAsPristine();
	}
	public update = ( item ) => this.db.doc( this.dbURL$.getValue() ).update( item );

	public rename = async ( id: string, oldName: string ) => {
		const name: string = await this.prompt( 'What is the new name?', oldName );
		if ( name && name !== '' ) this.db.doc( this.concept$.getValue() + '/' + id ).update( { name } );
	}

	public deleteSelected = async () => {
		const shouldWe = await this.confirm( 'Are you sure you want to delete selected item' + ( this.selectedItems.length > 1 ? 's' : '' ) + '?' );
		if ( shouldWe === true ) {
			for ( const id of this.selectedItems ) {
				await this.delete( { id, noConfirm: true } );
			}
			this.selectedItems = [];
		}
	}
	public delete = async ( payload: { id?: string, name?: string, noConfirm?: boolean } ): Promise<any> => {
		let confirmed = false;
		if ( !payload.id ) payload.id = this.cID$.getValue();
		const question = 'Are you sure you want to delete ' + ( payload.name ? payload.name : payload.id ) + '?';
		if ( !payload.noConfirm ) confirmed = await this.confirm( question );
		if ( payload.noConfirm ) confirmed = true;
		if ( confirmed ) {
			return new Promise( ( resolve, reject ) => {
				this.db.collection( this.concept$.getValue() ).
					snapshotChanges().
					pipe(
						take( 1 ),
						map( i => i.map( a => ( a.payload.doc ) ) ),
						map( i => i.map( a => ( { ...a.data(), ...{ id: a.id } } ) ) )
					).
					subscribe( ( items: any[] ) => {
						this.deleteAction( payload.id, items ).then( () => resolve() ).catch( reject );
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

	public subsDispose = ( subscriptions: Subscription[] ) => subscriptions.forEach( s => { s.unsubscribe(); s = null; } );
	public subsCreate = () => <Subscription[]>[];

	public getMaxPosition = ( items: Article[] ) => {
		let mp = 0;
		items.forEach( i => { mp = i.position > mp ? i.position : mp; } );
		return mp;
	}

	public moveUp = ( concept: string, itemIndex: number, items: any[] ) => this.movePosition( concept, itemIndex, items, -1 );
	public moveDown = ( concept: string, itemIndex: number, items: any[] ) => this.movePosition( concept, itemIndex, items, 1 );
	private movePosition = ( concept: string, itemIndex: number, items: any[], direction: 1 | -1 ) => {
		items.forEach( i => {
			if ( i.position === undefined ) i.position = this.getMaxPosition( items ) + 1;
		} );
		items.forEach( i => i.position *= 10 );
		items[ itemIndex ].position += direction * 11;
		items.sort( SortByPosition );
		items.forEach( ( i, index ) => {
			i.position = index + 1;
			this.db.doc( concept + '/' + i.id ).update( { position: i.position } );
		} );
	}

	public changeParent = async ( payload: { concept?: string, item: Item } ) => {
		if ( !payload.concept ) payload.concept = this.concept$.getValue();
		const items = ( await this.promisedItems( payload.concept ) ).filter( i => i.type === ItemType.folder );
		const modalRef: BsModalRef = this.modalService.show( ChangeParentComponent, { initialState: { item: payload.item, items, selectedParent: payload.item.parent } } );
		modalRef.content.onClose.subscribe( ( result ) => {
			console.log( 'Change Parent Result:', result );
			if ( result !== false ) {
				this.db.doc( payload.concept + '/' + payload.item.id ).update( { parent: result } );
			}
		}, console.error );
		/*
		const modalRef: BsModalRef = this.modalService.show( PromptComponent, { initialState: { question, defaultValue } } );
		return new Promise( ( resolve, reject ) => {
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
		*/
	}

	public changeAsset = ( currentAssetID: string ) => {
		return new Promise( async ( resolve, reject ) => {
			const items = ( await this.promisedItems( 'assets' ) );
			const modalRef: BsModalRef = this.modalService.show( AssetSelectorComponent, { initialState: { items, selectedAsset: currentAssetID } } );
			modalRef.content.onClose.subscribe( resolve, reject );
		} );
	}

	public promisedItems = ( concept: string ): Promise<any[]> => {
		return new Promise( ( resolve, reject ) => {
			this.db.collection( concept ).
				snapshotChanges().
				pipe(
					take( 1 ),
					map( a => a.map( aa => aa.payload ) ),
					map( a => a.map( aa => ( { ...aa.doc.data(), ...{ id: aa.doc.id } } ) ) )
				).
				subscribe( resolve, reject );
		} );
	}

	public promisedItem = ( concept: string, id: string ) => {
		return new Promise( ( resolve, reject ) => {
			this.db.doc( concept + '/' + id ).
				snapshotChanges().
				pipe(
					take( 1 ),
					map( a => a.payload ),
					map( a => ( { ...a.data(), ...{ id: a.id } } ) )
				).
				subscribe( resolve, reject );
		} );
	}

	public setNoneSelected = () => { this.selectedItems = []; };
	public setSelected = ( id: string ) => { this.selectedItems.push( id ); };
	public setUnselected = ( id: string ) => { this.selectedItems = this.selectedItems.filter( i => i !== id ); };
	public isSelected = ( id: string ) => ( this.selectedItems.findIndex( e => e === id ) >= 0 );

}
