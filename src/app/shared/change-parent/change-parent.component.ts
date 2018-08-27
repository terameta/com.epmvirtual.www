import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/generic.models';

@Component( {
	selector: 'app-change-parent',
	templateUrl: './change-parent.component.html',
	styleUrls: [ './change-parent.component.scss' ]
} )
export class ChangeParentComponent implements OnInit {
	@Input() items: Item[] = [];
	@Input() selectedParent: string;

	constructor() { }

	ngOnInit() {
	}

	public setParent = ( id: string ) => {
		this.selectedParent = id;
		console.log( this.selectedParent );
	}

}
