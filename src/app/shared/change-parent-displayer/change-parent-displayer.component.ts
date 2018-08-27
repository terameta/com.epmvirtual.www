import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/generic.models';

@Component( {
	selector: 'app-change-parent-displayer',
	templateUrl: './change-parent-displayer.component.html',
	styleUrls: [ './change-parent-displayer.component.scss' ]
} )
export class ChangeParentDisplayerComponent implements OnInit {
	@Input() items: Item[] = [];
	@Input() selectedParent: string;
	@Input() currentParent: string;

	public cItems: Item[] = [];

	constructor() { }

	ngOnInit() {
		this.cItems = this.items.filter( i => i.parent === this.currentParent );
		console.log( JSON.stringify( this.items ) );
		console.log( JSON.stringify( this.cItems ) );
		console.log( this.currentParent, typeof this.currentParent );
	}

	public setParent = ( id: string ) => {
		this.selectedParent = id;
		console.log( this.selectedParent );
	}

}
