export interface SettingsSMTP {
	host: string,
	port: number,
	isSecure: boolean,
	rejectUnAuthorized: boolean,
	user: string,
	pass: string
}
