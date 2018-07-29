export interface SettingsGeneral {
	companyName: string,
	companyStartDate: string,
	adminEmailAddress: string,
	supportEmailAddress: string,
	accountingEmailAddress: string,
	salesEmailAddress: string,
	domain: string,
	logoURL: string,
	paytoText: string,
	phoneNumbers: SettingsPhoneNumber[],
	counters: SettingsCounter[],
	selectedEMailTransport: string,
	eMailLetterHeadColor: string,
	eMailLetterHeadLogoURL: string
}

export interface SettingsPhoneNumber {
	position: number,
	country: string,
	number: string,
	linkNumber: string
}

export interface SettingsCounter {
	name: string,
	value: number
}

export const settingsGeneralDefault = (): SettingsGeneral => {
	return {
		companyName: '',
		companyStartDate: ( new Date() ).toDateString(),
		adminEmailAddress: 'admin@example.com',
		supportEmailAddress: 'support@example.com',
		accountingEmailAddress: 'accounting@example.com',
		salesEmailAddress: 'sales@example.com',
		domain: '',
		logoURL: '',
		paytoText: '',
		phoneNumbers: [ settingsPhoneNumberDefault() ],
		counters: [ settingsCounterDefault() ],
		selectedEMailTransport: '',
		eMailLetterHeadColor: '',
		eMailLetterHeadLogoURL: ''
	};
};

export const settingsPhoneNumberDefault = (): SettingsPhoneNumber => {
	return {
		position: 0,
		country: '',
		number: '',
		linkNumber: ''
	};
};

export const settingsCounterDefault = (): SettingsCounter => {
	return {
		name: '',
		value: 1
	};
};
