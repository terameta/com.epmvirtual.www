import { Item } from 'src/app/models/generic.models';

export interface SettingsRTC extends Partial<Item> {
	servers: {
		iceServers: { urls: string }[]
	}
}

export const settingsRTCDefault = (): SettingsRTC => {
	return {
		servers: {
			iceServers: []
		}
	};
};
