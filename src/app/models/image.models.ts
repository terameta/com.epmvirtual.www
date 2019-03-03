export interface Image {
	id: string,
	name: string,
	description: string,
	pool: string,
	basefile: string,
	type: ImageType,
	status: ImageStatus,
	architecture: Architecture,
	diskdriver: DiskDriver,
	netdriver: NetDriver,
	os: OS,
	osv: string,
	group: string,
	connectionInformation: string,
	requirements: {
		cpu: number,
		ram: number,
		hdd: number
	}
}

export enum ImageStatus {
	'Enabled' = 1,
	'Disabled' = 0
}

export enum ImageType {
	'QCow2' = 'qcow2',
	'Raw' = 'raw',
	'Ceph' = 'ceph',
}

export enum Architecture {
	'x86_64' = 'x86_64',
	'i386' = 'i386',
}

export enum DiskDriver {
	'Virtio' = 'virtio',
	'IDE' = 'ide',
}

export enum NetDriver {
	'Virtio' = 'virtio',
	'Realtek' = 'rtl8139',
	'Intel PRO/1000' = 'e1000',
}

export enum OS {
	'Centos' = 'centos',
	'Debian' = 'debian',
	'Exherbo' = 'exherbo',
	'Fedora' = 'fedora',
	'FreeBSD' = 'freebsd',
	'Gentoo' = 'gentoo',
	'Mint' = 'linux-mint',
	'OS X' = 'macosx',
	'RedHat' = 'redhat',
	'Solaris' = 'solaris',
	'Suse' = 'suse',
	'Ubuntu' = 'ubuntu',
	'Windows' = 'microsoft-windows',
}
