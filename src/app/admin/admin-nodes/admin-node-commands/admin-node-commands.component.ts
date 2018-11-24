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
				'sudo apt -y dist-upgrade',
				'sudo -S sed -i \'/Port 22/c\Port 14422\' /etc/ssh/sshd_config',
				'sudo -S sed -i \'/PermitRootLogin yes/c\PermitRootLogin no\' /etc/ssh/sshd_config',
				'sudo -S service ssh restart',
				'sudo apt -y install build-essential',
				'sudo apt -y install curl',
				'sudo apt -y autoremove',
				'sudo apt -y autoclean',
				'sudo apt -y install isc-dhcp-server',
				'sudo apt -y install apparmor',
				'sudo apt -y install apparmor-profiles',
				'sudo apt -y install htop',
				'sudo apt -y install iptables',
				'sudo apt -y install screen',
				'sudo apt -y install nfs-common',
				'sudo apt -y install netcf',
				'sudo apt -y install ntfs-3g',
				'sudo apt -y install ksmtuned',
				'sudo apt -y install kvm',
				'sudo apt -y install qemu',
				'sudo apt -y install libvirt-bin',
				'sudo apt -y install libvirt-dev',
				'sudo apt -y install qemu-kvm',
				'sudo apt -y install bridge-utils',
				'sudo apt -y install supermin',
				'sudo apt -y install debconf-utils',
				'sudo echo libguestfs-tools libguestfs/update-appliance boolean true | debconf-set-selections',
				'sudo apt -y install libguestfs-tools',
				'sudo apt -y install libguestfs0',
				'sudo apt -y install libguestfs-*',
				'sudo apt -y install virt-top',
				'sudo apt -y install virtinst',
				'sudo apt -y install sysv-rc-conf',
				'sudo apt -y install gcc',
				'sudo apt -y install make',
				'sudo apt -y install git',
				'sudo apt usermod -a -G libvirtd $(whoami)',
				'sudo service iptables start',
				'sudo echo "net.ipv4.ip_forward = 1"  /etc/sysctl.conf',
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
