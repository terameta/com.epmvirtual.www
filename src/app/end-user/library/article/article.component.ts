import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { ItemType, getDefaultItem } from '../../../models/generic.models';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { SharedService } from '../../../shared/shared.service';
import { filter, map, tap, take } from 'rxjs/operators';
import { SortByPosition } from '../../../../utilities/utilityFunctions';
import { UtilitiesService } from '../../../shared/utilities.service';
import { subsCreate, subsDispose } from '../../../../utilities/ngUtilities';

@Component( {
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: [ './article.component.scss' ]
} )
export class ArticleComponent implements OnInit, OnDestroy {
	public crumbs: { id: string, name: string }[] = [];
	public article: Article = <Article>getDefaultItem();
	public itemType = ItemType;
	public children: Article[] = [];

	private subs = subsCreate();

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.subs.push( this.ss.cID$.pipe( filter( a => !!a ) ).subscribe( this.handleIDChange ) );
		this.subs.push( this.ss.cItem$.pipe(
			filter( i => !!i.id ),
			map( i => ( <Article>i ) ),
			tap( i => { if ( i.sections ) i.sections.sort( SortByPosition ); } ),
			tap( ( i: any ) => { i.createdOn = i.createdOn ? i.createdOn.toDate() : ( new Date() ); } ),
			tap( ( i: any ) => { i.lastUpdatedOn = i.lastUpdatedOn ? i.lastUpdatedOn.toDate() : i.createdOn; } )
		).subscribe( this.handleItemChange ) );
	}

	ngOnDestroy() { subsDispose( this.subs ); }

	private handleIDChange = async ( id: string ) => {
		let cID = id;
		this.crumbs = [];
		while ( cID ) {
			const tempArticle: Article = ( await this.ss.promisedItem( 'library', cID ) ) as Article;
			this.crumbs.unshift( { id: tempArticle.id, name: tempArticle.name } );
			cID = tempArticle.parent;
		}
	}

	private handleItemChange = async ( item: Article ) => {
		this.article = item;
		if ( !this.article.published && this.article.type !== ItemType.folder ) {
			await this.ss.confirm( 'This tutorial is still under development, please come back later.', true );
			this.us.navigateTo( 'library', '0' );
		}
		if ( this.article.type === ItemType.folder ) this.findChildren( this.article.id );
	}

	private findChildren = ( parentID: string ) => {
		this.db.collection<Article>( '/library', ref => ref.where( 'parent', '==', parentID ).orderBy( 'position' ) ).
			valueChanges().
			pipe( take( 1 ) ).
			subscribe( c => this.children = c );
	}
}
