import { Item } from './generic.models';

export interface StoragePool extends Partial<Item> {
	id: string,
	name: string,
	rbdname: string,
	dc: string,
	monitors: string,
	user: string,
	secretuuid: string,
	key: string,
	files: { [ key: string ]: StoragePoolFile }
}

export interface StoragePoolFile {
	name: string,
	size: number,
	actualSize: number,
	lastCheck: Date
}

export const defaultStoragePool = (): StoragePool => ( {
	id: '',
	name: '',
	rbdname: '',
	dc: '',
	monitors: '',
	user: '',
	secretuuid: '',
	key: '',
	files: {}
} );
