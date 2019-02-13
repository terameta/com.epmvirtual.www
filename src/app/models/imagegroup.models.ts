export interface ImageGroup {
	id: string,
	name: string,
	position: number,
	type: ImageGroupType
}

export enum ImageGroupType {
	'Public' = 1,
	'Private' = 0
}
