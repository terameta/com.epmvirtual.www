import { Item } from './generic.models';

export interface DataCenter extends Partial<Item> {
	id: string,
	name: string,
	location: string,
	country: string,
	position: number
}

export const defaultDC = (): DataCenter => ( { id: '', name: '', location: '', country: '', position: 0 } );
