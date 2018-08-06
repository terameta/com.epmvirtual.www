export enum ItemType {
	folder = 1,
	asset = 2,
	document = 3
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
