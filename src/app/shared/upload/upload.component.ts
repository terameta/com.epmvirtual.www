import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Upload, ItemType } from '../../models/generic.models';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { SharedService } from '../shared.service';
import { AuthService } from '../../auth.service';
import { Asset } from '../../models/asset.models';

@Component( {
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: [ './upload.component.scss' ]
} )
export class UploadComponent implements OnInit, OnDestroy {
	@Input() parentID = '0';

	public uploads: Upload[] = [];

	public onClose: Subject<any>;
	public onUpload: Subject<any> = new Subject();

	constructor(
		private db: AngularFirestore,
		private storage: AngularFireStorage,
		private as: AuthService,
		public modalRef: BsModalRef
	) { }

	ngOnInit() {
		this.onClose = new Subject();
	}

	ngOnDestroy() {
		this.close();
	}

	public close = () => {
		this.onClose.next();
		this.modalRef.hide();
		this.onClose.complete();
		this.onUpload.complete();
	}

	public detectFiles = ( $event ) => {
		// console.log( $event.target.files );
		Object.keys( $event.target.files ).forEach( k => {
			const cUpload = new Upload( $event.target.files[ k ] );
			cUpload.uuid = this.db.createId();
			this.uploads.push( cUpload );
		} );
	}

	public upload = () => {
		this.uploads.
			filter( cu => cu.progress === 0 ).map( cu => ( {
				id: cu.uuid,
				name: cu.name,
				parent: this.parentID,
				type: ItemType.asset,
				contentType: cu.contentType,
				creator: this.as.userDetails.uid,
				createdOn: new Date(),
				upload: cu
			} ) ).forEach( ca => {
				ca.upload.progress = 0.01;
				const sName = 'asset-' + ca.id + '-' + ca.name.replace( /[^a-zA-Z0-9-.]/g, '-' );
				const uploadTask = this.storage.upload( sName, ca.upload.file );
				uploadTask.percentageChanges().subscribe( p => ca.upload.progress );
				uploadTask.then().then( result => {
					this.storage.ref( sName ).getDownloadURL().subscribe( dURL => {
						const { upload, ...toSave } = ca;
						( toSave as Partial<Asset> ).url = dURL;
						( toSave as Partial<Asset> ).storageAddress = sName;
						this.completeUpload( ca.id );
						this.onUpload.next( toSave );
					} );
				} ).catch( console.log );
			} );
	}

	private completeUpload = ( id: string ) => {
		this.uploads.filter( cu => cu.uuid === id ).forEach( cu => {
			cu.progress = 100;
			cu.countdown = 6;
		} );
		this.countdownUpload( id );
	}

	private countdownUpload = ( id: string ) => {
		this.uploads.filter( cu => cu.uuid === id ).forEach( cu => {
			cu.countdown--;
			if ( cu.countdown > 0 ) {
				setTimeout( () => { this.countdownUpload( id ); }, 1000 );
			} else {
				this.removeUpload( id );
			}
		} );
	}

	private removeUpload = ( id: string ) => {
		const i = this.uploads.findIndex( e => e.uuid === id );
		this.uploads.splice( i, 1 );
	}

}
