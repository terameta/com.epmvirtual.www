export interface IPBlock {
	id: string,
	name: string,
	dc: string,
	gateway: string,
	netmask: string,
	nameserver1: string,
	nameserver2: string,
	ips: IPAddress[]
}

export interface IPAddress {
	ip: string,
	mac: string,
	assigned: boolean
}
