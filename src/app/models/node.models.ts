import { Item, ItemType } from './generic.models';

export interface Node extends NodeCandidate {
	name: string
}

export const defaultNode = (): Node => ( { id: '', name: '', type: ItemType.node } as Node );

export interface NodeCandidateObject {
	id: string,
	items: NodeCandidate[]
}

export interface NodeCandidate extends Partial<Item> {
	id: string,
	hostname: string,
	ostype: string,
	osplatform: string,
	osarch: string,
	osrelease: string,
	keypresses: KeyPress[],
	responses: PtyResponse[]
}

export interface KeyPress {
	date: any,
	key: string,
	dateValue?: Date
}

export interface PtyResponse {
	date: any,
	datum: string,
	dateValue?: Date
}
