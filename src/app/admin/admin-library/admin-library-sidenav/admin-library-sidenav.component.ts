import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeModel } from 'angular-tree-component';
import { Subscription } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Document } from '../../../models/library.models';
import { UtilitiesService } from '../../../shared/utilities.service';
import { ItemType } from '../../../models/generic.models';

@Component( {
	selector: 'app-admin-library-sidenav',
	templateUrl: './admin-library-sidenav.component.html',
	styleUrls: [ './admin-library-sidenav.component.scss' ]
} )
export class AdminLibrarySidenavComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	public folderTree: any[] = [];

	public treeModel: TreeModel;
	public treeOptions = {
		animateExpand: true,
		animateSpeed: 10,
		animateAcceleration: 1
	};

	public documents: Document[] = [];

	private currentItemId = '0';
	private expandedTreeNodes = {};
	private currentItem = <Document>{};

	constructor(
		private db: AngularFirestore,
		private utilities: UtilitiesService
	) {
		this.subscriptions.push( this.db.collection<Document>( 'library', ref => ref.orderBy( 'name', 'asc' ) ).
			snapshotChanges().subscribe( this.initiateAll, this.handleIssues )
		);
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscriptions.forEach( s => s.unsubscribe() );
		this.subscriptions = [];
	}

	private initiateAll = ( result: DocumentChangeAction<Document>[] ) => {
		this.documents = result.map( d => d.payload.doc ).map( d => ( { id: d.id, ...d.data() } ) );
		if ( this.documents.length > 0 ) {
			this.folderTree = this.utilities.buildTree( this.documents );
			this.handleCurrentItem( this.currentItemId );
		}
	}

	private handleCurrentItem = ( id: string ) => {
		this.currentItemId = id;
		if ( this.documents.length > 0 ) {
			this.expandedTreeNodes = this.utilities.findAncestors( this.documents, id );
			this.documents.forEach( doc => { if ( doc.id === id ) { this.currentItem = doc; } } );
			if ( this.treeModel ) {
				this.handleTreeModelChanges();
			}
		}
	}

	public onTreeNodeActive = ( $event ) => {
		if ( $event.node.data.id !== this.currentItemId ) {
			this.utilities.navigateTo( 'library', $event.node.data.id );
		}
	}
	public onTreeInitialized = ( $event ) => {
		this.treeModel = $event.treeModel;
		this.handleTreeModelChanges();
	}
	private handleTreeModelChanges = () => {
		this.treeModel.expandedNodeIds = this.expandedTreeNodes;
		this.treeModel.activeNodeIds = {};
		// this.treeModel.activeNodeIds[this.currentItemId] = true;
		if ( this.currentItem.type === ItemType.folder ) {
			this.treeModel.activeNodeIds[ this.currentItemId ] = true;
		}
		if ( this.currentItem.type === ItemType.document ) {
			this.treeModel.activeNodeIds[ this.currentItem.parent ] = true;
		}
		this.treeModel.update();
	}

	private handleIssues = ( issue ) => {
		console.error( '===========================================' );
		console.error( '===========================================' );
		console.error( issue );
		console.error( '===========================================' );
		console.error( '===========================================' );
	}

}
