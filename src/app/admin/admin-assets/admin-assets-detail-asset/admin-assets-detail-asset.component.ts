import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Asset } from '../../../models/asset.models';
import { filter, tap } from 'rxjs/operators';
import { getDefaultItem } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-assets-detail-asset',
	templateUrl: './admin-assets-detail-asset.component.html',
	styleUrls: [ './admin-assets-detail-asset.component.scss' ]
} )
export class AdminAssetsDetailAssetComponent implements OnInit, OnDestroy {
	public item: Asset = <Asset>getDefaultItem();
	public canPreview = false;

	private subs = this.ss.subsCreate();

	constructor(
		public ss: SharedService
	) {
		this.subs.push( this.ss.cItem$.
			pipe(
				filter( i => i.id !== '' ),
				tap( ( i: any ) => { i.createdOn = i.createdOn ? i.createdOn.toDate() : ( new Date() ); } )
			).
			subscribe( ( i: Asset ) => {
				this.item = i;
				this.canPreview = this.item.contentType ? this.item.contentType.indexOf( 'image' ) >= 0 : false;
			} )
		);
	}

	ngOnInit() {
	}

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

}
