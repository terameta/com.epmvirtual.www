export interface Settings2CO {
	production: TwoCOSettings,
	sandbox: TwoCOSettings,
	demo: TwoCOSettings
}

export interface TwoCOSettings {
	username: string,
	password: string,
	sellerid: string
	privatekey: boolean
	publishablekey: string,
	secretword: string
}
