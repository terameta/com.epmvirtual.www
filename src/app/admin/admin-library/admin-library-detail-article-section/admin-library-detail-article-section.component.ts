import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section, Article } from '../../../models/library.models';
import { SharedService } from '../../../shared/shared.service';
import { Item, getDefaultItem } from '../../../models/generic.models';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Asset } from '../../../models/asset.models';

@Component( {
	selector: 'app-admin-library-detail-article-section',
	templateUrl: './admin-library-detail-article-section.component.html',
	styleUrls: [ './admin-library-detail-article-section.component.scss' ]
} )
export class AdminLibraryDetailArticleSectionComponent implements OnInit, OnDestroy {
	public section: Section = { title: '', content: '', position: 0 };
	public item: Article;

	private editor;
	private itemForm: NgForm;

	private subs = this.ss.subsCreate();

	editorOptions = {
		theme: 'vs-light',
		language: 'html',
		automaticLayout: true, minimap: {
			enabled: false
		}
	};

	constructor( public ss: SharedService ) { }

	ngOnInit() { this.subs.push( this.ss.cItem$.pipe( filter( i => i.id !== '' ) ).subscribe( this.handleItem ) ); }

	ngOnDestroy() { this.ss.subsDispose( this.subs ); }

	private handleItem = ( i: Item ) => {
		const sectionIndex = parseInt( this.ss.cURL$.getValue().split( '/' ).pop(), 10 );
		this.item = { ...<Article>getDefaultItem(), ...i };
		if ( this.item.sections && this.item.sections[ sectionIndex ] ) this.section = this.item.sections[ sectionIndex ];
		// console.log( this.ss.cURL$.getValue().split( '/' ).pop() );
	}

	public setEditor = ( uiEditor, f: NgForm ) => {
		this.editor = uiEditor;
		this.itemForm = f;
		// tslint:disable-next-line:no-bitwise
		this.editor.addCommand( [ monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S ], () => {
			this.itemForm.form.markAsPristine();
			this.ss.save( this.item, this.itemForm );
		} );
		// tslint:disable-next-line:no-bitwise
		// this.editor.addCommand( [ monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_I ], () => {
		// 	this.insertImage();
		// } );
	}

	public insertImage = async () => {
		const img = await this.ss.changeAsset( '1' );
		if ( img ) {
			const ca = ( await this.ss.promisedItem( 'assets', ( img as string ) ) ) as Asset;
			this.editor.trigger( 'keyboard', 'type', { text: '<img src="' + ca.url + '" title="' + ca.name + '">' } );
		}
	}

}
