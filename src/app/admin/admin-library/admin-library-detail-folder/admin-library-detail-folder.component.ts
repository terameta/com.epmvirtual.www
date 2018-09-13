import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot, DocumentChangeAction } from 'angularfire2/firestore';
import { AdminLibraryService } from '../admin-library.service';
import { Subscription, timer } from 'rxjs';
import { filter, debounce } from 'rxjs/operators';
import { Article } from '../../../models/library.models';
import { SharedService } from '../../../shared/shared.service';
import { ItemType } from '../../../models/generic.models';
import { SortByPosition } from '../../../../utilities/utilityFunctions';

@Component( {
	selector: 'app-admin-library-detail-folder',
	templateUrl: './admin-library-detail-folder.component.html',
	styleUrls: [ './admin-library-detail-folder.component.scss' ]
} )
export class AdminLibraryDetailFolderComponent implements OnInit, OnDestroy {
	// private articleSubscription: Subscription;
	// private idSubscription: Subscription;
	// private childrenSubscription: Subscription;

	// public article: Article;
	// public children: Article[] = [];
	// public selectedItems: string[] = [];

	// public docsReceived = false;

	// public itemType = ItemType;

	constructor(
		// private db: AngularFirestore,
		// public ms: AdminLibraryService,
		// public ss: SharedService
	) { }

	ngOnInit() {
		// this.idSubscription = this.ss.cID$.
		// 	pipe( filter( a => !!a ) ).
		// 	subscribe( this.handleIDChange );
	}

	ngOnDestroy() {
		// if ( this.articleSubscription ) this.articleSubscription.unsubscribe();
		// this.articleSubscription = null;
		// if ( this.idSubscription ) this.idSubscription.unsubscribe();
		// this.idSubscription = null;
		// if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		// this.childrenSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		// this.docsReceived = false;
		// this.children = [];
		// if ( this.articleSubscription ) this.articleSubscription.unsubscribe();
		// this.articleSubscription = this.db.
		// 	doc<Article>( '/library/' + id ).snapshotChanges().
		// 	subscribe( this.handleArticleChange );
		// if ( this.childrenSubscription ) this.childrenSubscription.unsubscribe();
		// this.childrenSubscription = this.db.
		// 	collection( '/library', ref => ref.where( 'parent', '==', id ) ).
		// 	snapshotChanges().
		// 	pipe( debounce( () => timer( 500 ) ) ).
		// 	subscribe( this.handleChildrenChange );
	}

	private handleArticleChange = ( dAction: Action<DocumentSnapshot<Article>> ) => {
		// this.article = dAction.payload.data();
	}

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Article>[] ) => {
		// let wasThereUndefined = false;
		// this.docsReceived = true;
		// this.children = dChildrenActions.
		// 	map( c => ( { ...c.payload.doc.data(), ...{ id: c.payload.doc.id } } ) ).
		// 	map( d => { d.createdOn = d.createdOn ? ( d.createdOn as any ).toDate() : ( new Date() ); return d; } );
		// this.children.forEach( ( c, i ) => {
		// 	if ( c.position === undefined ) {
		// 		c.position = this.ss.getMaxPosition( this.children ) + 1;
		// 		this.db.doc( 'library/' + c.id ).update( { position: c.position } );
		// 		wasThereUndefined = true;
		// 	}
		// } );
		// this.children.sort( SortByPosition );
		// if ( !wasThereUndefined ) {
		// 	this.children.forEach( ( c, i ) => {
		// 		if ( c.position !== ( i + 1 ) ) c.position = i + 1;
		// 		this.db.doc( 'library/' + c.id ).update( { position: c.position } );
		// 	} );
		// }
	}

	public isSelected = ( id: string ) => {
		// return this.selectedItems.findIndex( e => e === id ) >= 0;
	}

	public setSelected = ( id: string ) => {
		// this.selectedItems.push( id );
	}

	public setUnselected = ( id: string ) => {
		// this.selectedItems = this.selectedItems.filter( i => i !== id );
	}

	// public setAllSelected = () => this.selectedItems = this.children.map( item => item.id );
	// public setNoneSelected = () => this.selectedItems = [];

	// public rename = async ( id: string, oldName: string ) => {
	// 	const name: string = await this.ss.prompt( 'What is the new name?', oldName );
	// 	if ( name && name !== '' ) this.db.doc<Article>( '/library/' + id ).update( { name } );
	// }

}
