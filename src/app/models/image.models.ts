export interface Image {
	id: string,
	name: string,
	pool: string,
	basefile: string,
	status: ImageStatus,
	architecture: string,
	diskdriver: string,
	netdriver: string,
	imagetype: string,
	os: string,
	osv: string,
	group: string,
	connectionInformation: string,
	requirements: {
		cpu: number,
		ram: number,
		hdd: number
	}
}

export enum ImageStatus {
	'Enabled' = 1,
	'Disabled' = 0
}
