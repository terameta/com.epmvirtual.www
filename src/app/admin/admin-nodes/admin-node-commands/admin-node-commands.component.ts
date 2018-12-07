import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Node, defaultNode } from 'src/app/models/node.models';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { SharedService } from 'src/app/shared/shared.service';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/utilities.service';

@Component( {
	selector: 'app-admin-node-commands',
	templateUrl: './admin-node-commands.component.html',
	styleUrls: [ './admin-node-commands.component.scss' ]
} )
export class AdminNodeCommandsComponent implements OnInit {
	public node$: Observable<Node>;
	public customCommand = '';
	private nodeRef: AngularFirestoreDocument;

	public setCommands = [
		{ label: 'List Files (ls -lh)', command: 'ls -lh' },
		{ label: 'List Files (dir)', command: 'dir' },
		{
			label: 'Deploy', command: [
				'sudo apt update',
				'sudo apt -y -qq dist-upgrade',
				'sudo -S sed -i \'/Port 22/c\Port 14422\' /etc/ssh/sshd_config',
				'sudo -S sed -i \'/PermitRootLogin yes/c\PermitRootLogin no\' /etc/ssh/sshd_config',
				'sudo -S service ssh restart',
				'sudo apt -y -qq install build-essential',
				'sudo apt -y -qq install curl',
				'sudo apt -y -qq autoremove',
				'sudo apt -y -qq autoclean',
				'sudo apt -y -qq install isc-dhcp-server',
				'sudo apt -y -qq install apparmor',
				'sudo apt -y -qq install apparmor-profiles',
				'sudo apt -y -qq install htop',
				'sudo apt -y -qq install iptables',
				'sudo apt -y -qq install screen',
				'sudo apt -y -qq install nfs-common',
				'sudo apt -y -qq install netcf',
				'sudo apt -y -qq install ntfs-3g',
				'sudo apt -y -qq install ksmtuned',
				'sudo apt -y -qq install libvirt-bin',
				'sudo apt -y -qq install libvirt-dev',
				'sudo apt -y -qq install qemu-kvm',
				'sudo apt -y -qq install libvirt-daemon-system',
				'sudo apt -y -qq install libvirt-clients',
				'sudo apt -y -qq install qemu',
				'sudo apt -y -qq install bridge-utils',
				'sudo apt -y -qq install supermin',
				'sudo apt -y -qq install debconf-utils',
				'sudo apt -y -qq install libguestfs-tools',
				'sudo apt -y -qq install libguestfs0',
				'sudo apt -y -qq install libguestfs-zfs',
				'sudo apt -y -qq install libguestfs-hfsplus',
				'sudo apt -y -qq install libguestfs-gfs2',
				'sudo apt -y -qq install libguestfs-nilfs',
				'sudo apt -y -qq install libguestfs-rescue',
				'sudo apt -y -qq install libguestfs-reiserfs',
				'sudo apt -y -qq install libguestfs-rsync',
				'sudo apt -y -qq install libguestfs-jfs',
				'sudo apt -y -qq install virt-top',
				'sudo apt -y -qq install virtinst',
				// 'sudo apt -y -qq install sysv-rc-conf',
				'sudo apt -y -qq install gcc',
				'sudo apt -y -qq install make',
				'sudo apt -y -qq install git',
				'sudo usermod -a -G libvirt $(whoami)',
				// 'sudo service iptables start',
				// 'sudo echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf',
				'node -v',
				'npm -v',
				'sudo mkdir /etc/libvirt/hooks -p',
				'sudo service libvirt-bin restart'
			]
		}
	];

	constructor(
		private db: AngularFirestore,
		private ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.nodeRef = this.db.doc<Node>( 'nodes/' + this.ss.cID$.getValue() );

		this.node$ = this.nodeRef.snapshotChanges().
			pipe( map( a => ( { ...defaultNode(), ...this.us.action2Data<Node>( a ) } ) ) );
	}

	public runCommand = async ( command: string | string[] ) => {
		if ( Array.isArray( command ) ) {
			for ( const cmd of command ) {
				await this.runCommand( cmd );
			}
		} else {
			console.log( 'Command to run:', command );
			await this.nodeRef.update( {
				commands: firestore.FieldValue.arrayUnion( {
					date: new Date(),
					command
				} )
			} );
		}
	}

}
