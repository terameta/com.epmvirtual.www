export interface SettingsPayPal {
	production: PayPalSettings,
	sandbox: PayPalSettings
}

export interface PayPalSettings {
	email: string,
	username: string,
	password: string,
	signature: string
	isSandBox: boolean
	clientID: string,
	secret: string
}
