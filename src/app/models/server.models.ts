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
	plan: string,
	dc: string,
	price: number,
	status: ServerStatus
	connectionDetails: string
}

export enum ServerStatus {
	'Running' = 'running',
	'ShuttingDown' = 'shutting down',
	'ShutDown' = 'shut down',
	'Restarting' = 'restarting',
	'Migrating' = 'migrating'
}
