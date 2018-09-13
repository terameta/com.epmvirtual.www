import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../../../models/library.models';
import { ItemType, getDefaultItem } from '../../../models/generic.models';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { SharedService } from '../../../shared/shared.service';
import { filter } from 'rxjs/operators';

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

	constructor(
		private db: AngularFirestore,
		private ss: SharedService
	) { }

	ngOnInit() {
		this.subs.push( this.ss.cID$.pipe( filter( a => !!a ) ).subscribe( this.handleIDChange ) );
		// this.subs.push( this.db.collection<Article>( '/library' ).snapshotChanges().subscribe( this.handleDocChange ) );
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleIDChange = async ( id: string ) => {
		let cID = id;
		this.crumbs = [];
		while ( cID ) {
			const tempArticle: Article = ( await this.ss.promisedItem( 'library', cID ) ) as Article;
			if ( id === cID ) this.article = tempArticle;
			this.crumbs.unshift( { id: tempArticle.id, name: tempArticle.name } );
			cID = tempArticle.parent;
		}
	}

	// private handleDocChange = ( dDocActions: DocumentChangeAction<Article>[] ) => {
	// 	this.docObject = keyBy( dDocActions.map( c => ( { ...c.payload.doc.data(), ...{ id: c.payload.doc.id } } ) ), 'id' );
	// }

}
