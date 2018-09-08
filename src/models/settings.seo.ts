import { Item } from '../app/models/generic.models';

export interface SettingsSEO extends Partial<Item> {
	title: string,
	description: string,
	logo: string
}

export const settingsSEODefault = (): SettingsSEO => {
	return <SettingsSEO>{
		title: '',
		description: '',
		logo: ''
	};
};
