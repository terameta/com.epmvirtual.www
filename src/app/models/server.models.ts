export interface Server {
	id: string,
	name: string,
	cpu: number,
	ram: number,
	hdd: number,
	bandwidth: number,
	ip: string,
	mac: string,
	owner: string,
	nextinvoicedate: Date,
	baseImage: string,
	plan: string,
	dc: string,
	price: number,
	status: ServerStatus
	connectionDetails: string
}

export enum ServerStatus {
	'Pending Create' = -1,
	'Running' = 1,
	'ShuttingDown' = 2,
	'ShutDown' = 3,
	'Restarting' = 4,
	'Migrating' = 5
}
