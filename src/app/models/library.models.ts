import { Item } from './generic.models';

export interface Section {
	title: string,
	content: string,
	position: number
}

export interface Article extends Item {
	shortDescription: string,
	description: string,
	creator: string,
	createdOn: Date,
	sections: Section[],
	position: number
}
