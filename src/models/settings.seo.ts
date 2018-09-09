import { Item } from '../app/models/generic.models';

export interface SettingsSEO extends Partial<Item> {
	title: string,
	description: string,
	logo: string,
	twitterhandle: string,
	twittercardimage: string,
	facebookappid: string,
	opengraphimage: string
}

export const settingsSEODefault = (): SettingsSEO => {
	return {
		title: '',
		description: '',
		logo: '',
		twitterhandle: '',
		twittercardimage: '',
		facebookappid: '',
		opengraphimage: ''
	};
};
