import { Item } from './generic.models';

export interface Node extends NodeCandidate {
	name: string
}

export interface NodeCandidateObject {
	id: string,
	items: NodeCandidate[]
}

export interface NodeCandidate extends Item {
	id: string,
	hostname: string,
	ostype: string,
	osplatform: string,
	osarch: string,
	osrelease: string
}
