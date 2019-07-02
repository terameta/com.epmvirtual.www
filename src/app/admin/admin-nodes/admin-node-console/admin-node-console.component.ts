import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { switchMap, map, filter, take, tap, takeUntil } from 'rxjs/operators';
import { SettingsRTC } from 'src/models/settings.rtc';

@Component( {
	selector: 'app-admin-node-console',
	templateUrl: './admin-node-console.component.html',
	styleUrls: [ './admin-node-console.component.scss' ],
	// changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AdminNodeConsoleComponent implements OnInit, OnDestroy, AfterContentInit {
	// public pcstate$ = new BehaviorSubject<string>( 'Not initiated' );
	private destroy$ = new Subject<boolean>();
	public pcstate = 'Not initiated';
	public term: Terminal = null;
	public termDims = 'W:0 - H:0';
	private pc: RTCPeerConnection = null;
	private dc: RTCDataChannel = null;
	private dcinitial: RTCDataChannel = null;
	public screenHeight = 300;
	public screenWidth = 100;
	public consoleHeight = '100px';
	public consoleWidth = '100%';
	private afterInited = false;
	public zenModeEnabled = false;
	@ViewChild( 'terminal', { static: false } ) terminal: ElementRef;

	public node$: Observable<Node> = this.ss.cID$.pipe(
		switchMap( id => this.db.doc<Node>( 'nodes/' + id ).snapshotChanges() ),
		map( a => this.us.action2Data<Node>( a ) )
	);

	@HostListener( 'window:resize', [ '$event' ] ) onResize( event?) {
		if ( this.afterInited ) {
			this.screenHeight = window.innerHeight;
			this.screenWidth = window.innerWidth;
			if ( this.zenModeEnabled ) {
				this.consoleHeight = 'calc(100% - 32px)';
				this.consoleWidth = 'calc(100% - 32px)';
			} else {
				this.consoleHeight = this.screenHeight - 278 + 'px';
				this.consoleWidth = '100%';
			}

			if ( this.term ) setTimeout( () => fit( this.term ), 1 );
		} else {
			setTimeout( () => this.onResize(), 1000 );
			console.log( 'Host listener, is called but doing nothing, afterinited is false, we will retry in 1 sec' );
		}
	}

	constructor(
		private db: AngularFirestore,
		public ss: SharedService,
		private us: UtilitiesService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.cleanUp();
		this.ss.cID$.pipe(
			tap( this.cleanUp ),
			takeUntil( this.destroy$ ),
			switchMap( () => this.db.doc<SettingsRTC>( 'settings/rtc' ).valueChanges().pipe( takeUntil( this.destroy$ ) ) )
		).subscribe( this.establishPeerConnection );
	}
	ngOnDestroy() {
		this.cleanUp();
		this.destroy$.next( true );
		this.destroy$.unsubscribe();
		this.destroy$ = null;
	}
	ngAfterContentInit() {
		this.afterInited = true;
		this.onResize();
	}

	private cleanUp = () => {
		if ( this.pc ) this.pc.close();
		if ( this.dcinitial ) this.dcinitial.close();
		if ( this.dc ) this.dc.close();
		this.dcinitial = null;
		this.dc = null;
		this.pc = null;
	}

	private establishPeerConnection = async ( settings: SettingsRTC ) => {
		this.cleanUp();
		this.pcstate = 'Initiating';

		const nodeRef = this.db.doc<any>( 'nodes/' + this.ss.cID$.getValue() );
		await nodeRef.update( { rtc: {} } );
		this.pc = new RTCPeerConnection( settings.servers );
		this.pc.onicecandidate = ( candidate ) => {
			if ( candidate.candidate ) {
				nodeRef.update( {
					'rtc.offerice': firestore.FieldValue.arrayUnion( JSON.stringify( { 'ice': candidate.candidate } ) )
				} );
			}
		};
		this.pc.oniceconnectionstatechange = () => {
			console.log( 'Peer Connection State:', this.pc ? this.pc.iceConnectionState : 'No Peer Connection' );
			this.pcstate = this.pc ? this.pc.iceConnectionState : 'No Peer Connection';
			if ( this.pcstate === 'failed' ) {
				this.consoleStop();
				setTimeout( () => { this.pcstate = 'Connection dropped, retrying. Please wait...'; }, 1000 );
				setTimeout( () => { this.establishPeerConnection( settings ); }, 10000 );
			}
			if ( this.pcstate === 'completed' ) this.consoleStart();
			this.forceChangeDetection();
		};

		this.dcinitial = this.pc.createDataChannel( 'initialdatachannel' );
		const offer = await this.pc.createOffer();
		await this.pc.setLocalDescription( offer );
		await nodeRef.update( { rtc: { offer: JSON.stringify( this.pc.localDescription ) } } );
		nodeRef.valueChanges().pipe( filter( n => n.rtc.answer ), take( 1 ) ).subscribe( async ( n ) => {
			if ( this.pc ) {
				await this.pc.setRemoteDescription( JSON.parse( n.rtc.answer ) );
				await nodeRef.update( { 'rtc.answer': null } );
			}
		} );
		nodeRef.valueChanges().pipe( takeUntil( this.destroy$ ), filter( n => n.rtc.answerice ) ).subscribe( async ( n ) => {
			if ( Array.isArray( n.rtc.answerice ) ) {
				n.rtc.answerice.forEach( ic => {
					if ( this.pc ) this.pc.addIceCandidate( ( JSON.parse( ic ) ).ice );
				} );
			}
		} );
	}

	public consoleStart = async () => {
		this.dc = this.pc.createDataChannel( 'console' );
		console.log( 'Data channel is now created' );
		console.log( 'Data channel id:', this.dc.id );
		console.log( 'Data channel label:', this.dc.label );
		this.dc.onopen = () => {
			console.log( 'Data channel is now open' );
			this.term = new Terminal( { cursorBlink: true, scrollback: 60, rows: 10, cols: 10 } );
			// this.term.on( 'key', ( key, event ) => this.dc.send( JSON.stringify( { key, type: 'key' } ) ) );
			this.term.onKey( ( { key, domEvent } ) => this.dc.send( JSON.stringify( { key, type: 'key' } ) ) );
			// this.term.on( 'resize', ( resizeData: { cols: number, rows: number } ) => {
			// 	this.termDims = 'W:' + resizeData.cols + ' - H:' + resizeData.rows;
			// 	this.dc.send( JSON.stringify( { ...resizeData, type: 'resize' } ) );
			// } );
			this.term.onResize( ( resizeData: { cols: number, rows: number } ) => {
				this.termDims = 'W:' + resizeData.cols + ' - H:' + resizeData.rows;
				this.dc.send( JSON.stringify( { ...resizeData, type: 'resize' } ) );
			} );
			this.term.open( this.terminal.nativeElement );
			this.term.clear();
			this.onResize();
			this.dc.onmessage = ( event ) => {
				const data = JSON.parse( event.data );
				if ( data.type === 'data' ) this.term.write( data.data );
				if ( data.type === 'exit' ) this.consoleStop();
			};
		};
		this.dc.onclose = ( event ) => {
			console.log( 'Data channel is now closed:', this.dc ? this.dc.label : 'Lost Channel' );
			console.log( event );
			this.dc = null;
			this.consoleStop();
		};
		this.forceChangeDetection();
	}

	public consoleStop = async () => {
		if ( this.dc ) this.dc.close();
		// if ( this.term ) this.term.destroy();
		if ( this.term ) this.term.dispose();
		this.term = null;
		this.zenModeEnabled = false;
		this.forceChangeDetection();
	}

	private forceChangeDetection = () => {
		if ( this.destroy$ ) this.cdr.detectChanges();
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 1 );
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 1000 );
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 2000 );
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 3000 );
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 4000 );
		setTimeout( () => { if ( this.destroy$ ) this.cdr.detectChanges(); }, 5000 );
	}

	public toggleZenMode = () => {
		this.zenModeEnabled = !this.zenModeEnabled;
		this.forceChangeDetection();
		if ( this.term ) setTimeout( () => { this.term.focus(); }, 10 );
		this.onResize();
	}

}
