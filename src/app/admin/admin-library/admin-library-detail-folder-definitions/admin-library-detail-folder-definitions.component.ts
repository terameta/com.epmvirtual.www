import { Component, OnInit, OnDestroy } from '@angular/core';
import { Folder, getDefaultItem, ItemType } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { filter, debounce } from 'rxjs/operators';
import { Article } from '../../../models/library.models';
import { timer, Subscription } from 'rxjs';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-admin-library-detail-folder-definitions',
	templateUrl: './admin-library-detail-folder-definitions.component.html',
	styleUrls: [ './admin-library-detail-folder-definitions.component.scss' ]
} )
export class AdminLibraryDetailFolderDefinitionsComponent implements OnInit, OnDestroy {
	public currentFolder = <Folder>getDefaultItem();
	public children: Article[] = [];
	public docsReceived = false;

	public concept = 'library';

	private subs = subsCreate();
	private subc: Subscription;

	public itemType = ItemType;

	constructor(
		private db: AngularFirestore,
		public ss: SharedService
	) { }

	ngOnInit() {
		this.subs.push(
			this.ss.cItem$.
				pipe( filter( f => f.id !== '' ) ).
				subscribe( f => {
					this.currentFolder = ( f as Folder );
					this.docsReceived = false;
					if ( this.subc ) { this.subc.unsubscribe(); this.subc = null; }
					this.subc = this.db.
						collection<Article>( '/library', ref => ref.where( 'parent', '==', f.id ) ).
						snapshotChanges().
						pipe( debounce( () => timer( 500 ) ) ).
						subscribe( this.handleChildrenChange );
				} )
		);
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleChildrenChange = ( dChildrenActions: DocumentChangeAction<Article>[] ) => {
		let wasThereUndefined = false;
		this.docsReceived = true;
		this.children = dChildrenActions.
			map( c => ( { ...c.payload.doc.data(), ...{ id: c.payload.doc.id } } ) ).
			map( d => { d.createdOn = d.createdOn ? ( d.createdOn as any ).toDate() : ( new Date() ); return d; } );
		this.children.forEach( ( c, i ) => {
			if ( c.position === undefined ) {
				c.position = this.ss.getMaxPosition( this.children ) + 1;
				this.db.doc( 'library/' + c.id ).update( { position: c.position } );
				wasThereUndefined = true;
			}
		} );
		this.children.sort( SortByPosition );
		if ( !wasThereUndefined ) {
			this.children.forEach( ( c, i ) => {
				if ( c.position !== ( i + 1 ) ) c.position = i + 1;
				this.db.doc( 'library/' + c.id ).update( { position: c.position } );
			} );
		}
	}

	public setAllSelected = () => this.ss.selectedItems = this.children.map( item => item.id );

	// // public rename = async ( id: string, oldName: string ) => {
	// // 	const name: string = await this.ss.prompt( 'What is the new name?', oldName );
	// // 	if ( name && name !== '' ) this.db.doc<Article>( '/library/' + id ).update( { name } );
	// // }

}
