import { Item } from './generic.models';

export interface Section {
	title: string,
	content: string,
	position: number
}

export interface Article extends Item {
	shortDescription: string,
	description: string,
	twitterImage: string,
	openGraphImage: string,
	creator: string,
	createdOn: Date,
	lastUpdatedOn: Date,
	sections: Section[],
	position: number,
	published: boolean
}
