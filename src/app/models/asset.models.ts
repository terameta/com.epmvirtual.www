import { Item } from './generic.models';

export interface Asset extends Item {
	description: string,
	creator: string,
	createdOn: Date
}
