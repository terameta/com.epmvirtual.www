import { Item, ItemType } from './generic.models';

export interface Asset extends Item {
	description: string,
	storageAddress: string,
	contentType: string,
	url: string,
	creator: string,
	createdOn: Date
}

export const getDefaultAsset = (): Asset => {
	return {
		id: '',
		name: '',
		type: ItemType.asset,
		parent: '0',
		description: '',
		storageAddress: '',
		contentType: '',
		url: '',
		creator: '',
		createdOn: new Date()
	};
};
