export enum ItemType {
	folder = 1,
	asset = 2,
	article = 3,
	setting = 4
}

export interface Item {
	id: string,
	name: string,
	type: ItemType,
	parent: string
}

export interface EVMap<T> {
	[ key: string ]: T
}

export const getDefaultItem = (): Item => <Item>{ id: '', name: '', type: null, parent: '0' };

export class Upload {
	$key: string;
	uuid: string;
	name: string;
	contentType: string;
	url: string;
	progress: number;
	parent: string;
	path: string;
	countdown: number;
	createdAt: Date = new Date();

	constructor( public file: File ) {
		this.name = this.file.name;
		this.contentType = this.file.type;
		this.progress = 0;
	}
}
