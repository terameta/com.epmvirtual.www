export interface Node {
	id: string,
	name: string
}

export interface NodeCandidateObject {
	id: string,
	items: NodeCandidate[]
}

export interface NodeCandidate {
	id: string,
	hostname: string,
	type: string,
	platform: string,
	arch: string,
	release: string
}
