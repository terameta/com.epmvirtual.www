import { Item } from '../app/models/generic.models';

export interface SettingsTwitter extends Partial<Item> {
	handle: string,
	company: string,
	logo: string
}

export const settingsTwitterDefault = (): SettingsTwitter => {
	return <SettingsTwitter>{
		handle: '',
		company: '',
		logo: ''
	};
};
