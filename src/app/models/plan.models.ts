export interface Plan {
	id: string,
	name: string,
	cpu: number,
	hdd: number,
	ram: number,
	bandwidth: number,
	price: number,
	position: number
}

export const getDefaultPlan = (): Plan => ( {
	id: '',
	name: 'New Plan',
	cpu: 0,
	hdd: 0,
	ram: 0,
	bandwidth: 0,
	price: 0,
	position: 9999999999
} );


