import { ImageStatus } from './image.models';

export interface ISOFile {
	id: string,
	name: string,
	pool: string,
	file: string,
	status: ImageStatus
}
