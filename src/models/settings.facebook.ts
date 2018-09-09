import { Item } from '../app/models/generic.models';

export interface SettingsFacebook extends Partial<Item> {
	appid: string,
	logo: string
}

export const settingsFacebookDefault = (): SettingsFacebook => {
	return <SettingsFacebook>{
		appid: '',
		logo: ''
	};
};
