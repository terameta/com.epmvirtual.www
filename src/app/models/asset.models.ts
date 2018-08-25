import { Item } from './generic.models';

export interface Asset extends Item {
	description: string,
	storageAddress: string,
	contentType: string,
	url: string,
	creator: string,
	createdOn: Date
}
