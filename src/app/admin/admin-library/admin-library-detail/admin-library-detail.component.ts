import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { Article } from '../../../models/library.models';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ItemType } from '../../../models/generic.models';
import { SharedService } from '../../../shared/shared.service';

@Component( {
	selector: 'app-admin-library-detail',
	templateUrl: './admin-library-detail.component.html',
	styleUrls: [ './admin-library-detail.component.scss' ]
} )
export class AdminLibraryDetailComponent implements OnInit, OnDestroy {
	private articleSubscription: Subscription;
	private idSubscription: Subscription;

	public itemType = ItemType;
	public articleType: ItemType = ItemType.folder;

	constructor(
		private db: AngularFirestore,
		private ss: SharedService
	) {
		this.idSubscription = this.ss.cID$.
			pipe( filter( a => !!a ) ).
			subscribe( this.handleIDChange );
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if ( this.articleSubscription ) { this.articleSubscription.unsubscribe(); }
		this.articleSubscription = null;
		if ( this.idSubscription ) { this.idSubscription.unsubscribe(); }
		this.idSubscription = null;
	}

	private handleIDChange = ( id: string ) => {
		if ( this.articleSubscription ) { this.articleSubscription.unsubscribe(); }
		this.articleSubscription = this.db.
			doc<Article>( '/library/' + id ).
			snapshotChanges().
			subscribe( this.handleArticleChange );
	}

	private handleArticleChange = ( dAction: Action<DocumentSnapshot<Article>> ) => {
		this.articleType = dAction.payload.data().type;
	}

}
