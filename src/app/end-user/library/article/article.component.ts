import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { ItemType, getDefaultItem } from '../../../models/generic.models';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { SharedService } from '../../../shared/shared.service';
import { filter, map, tap } from 'rxjs/operators';
import { SortByPosition } from '../../../../utilities/utilityFunctions';

@Component( {
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: [ './article.component.scss' ]
} )
export class ArticleComponent implements OnInit, OnDestroy {
	public crumbs: { id: string, name: string }[] = [];
	public article: Article = <Article>getDefaultItem();
	public itemType = ItemType;

	private subs = this.ss.subsCreate();

	constructor( private ss: SharedService ) { }

	ngOnInit() {
		this.subs.push( this.ss.cID$.pipe( filter( a => !!a ) ).subscribe( this.handleIDChange ) );
		this.subs.push( this.ss.cItem$.pipe(
			filter( i => !!i.id ),
			map( i => ( <Article>i ) ),
			tap( i => { if ( i.sections ) i.sections.sort( SortByPosition ); } ),
			tap( ( i: any ) => { i.createdOn = i.createdOn ? i.createdOn.toDate() : ( new Date() ); } ),
			tap( ( i: any ) => { i.lastUpdatedOn = i.lastUpdatedOn ? i.lastUpdatedOn.toDate() : i.createdOn; } )
		).subscribe( i => this.article = i ) );
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleIDChange = async ( id: string ) => {
		let cID = id;
		this.crumbs = [];
		while ( cID ) {
			const tempArticle: Article = ( await this.ss.promisedItem( 'library', cID ) ) as Article;
			this.crumbs.unshift( { id: tempArticle.id, name: tempArticle.name } );
			cID = tempArticle.parent;
		}
	}
}