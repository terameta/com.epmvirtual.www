import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { Observable, Subject } from 'rxjs';
import { Node } from 'src/app/models/node.models';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { switchMap, map, tap, filter, take } from 'rxjs/operators';
import { SettingsRTC } from 'src/models/settings.rtc';
import { firestore } from 'firebase/app';

@Component( {
	selector: 'app-admin-node-console',
	templateUrl: './admin-node-console.component.html',
	styleUrls: [ './admin-node-console.component.scss' ]
} )
export class AdminNodeConsoleComponent implements OnInit {
	public start$ = new Subject<Event>();
	private pc: RTCPeerConnection = null;

	public node$: Observable<Node> = this.ss.cID$.pipe(
		switchMap( id => this.db.doc<Node>( 'nodes/' + id ).snapshotChanges() ),
		map( a => this.us.action2Data<Node>( a ) )
	);

	constructor(
		private db: AngularFirestore,
		public ss: SharedService,
		private us: UtilitiesService
	) { }

	ngOnInit() {
		this.start$.
			pipe( switchMap( () => this.db.doc( 'settings/rtc' ).valueChanges() ) ).
			subscribe( this.handleRTC );
		setTimeout( () => {
			this.start$.next();
		}, 3000 );
		// navigator.getUserMedia = ( navigator.getUserMedia || ( navigator as any ).webkitGetUserMedia || ( navigator as any ).mozGetUserMedia || ( navigator as any ).msGetUserMedia );
		// console.log( typeof navigator.getUserMedia );
		// const servers = { 'iceServers': [ { 'urls': 'stun:stun.l.google.com:19302' } ] };
		// const pc = new RTCPeerConnection( servers );
		// pc.onicecandidate = ( event ) => {
		// 	console.log( event );
		// };
		// this.node$.subscribe( ( node ) => {
		// 	if ( node.rtc && node.rtc.sdp && 'string' === typeof node.rtc.sdp ) node.rtc.sdp = JSON.parse( node.rtc.sdp );
		// 	if ( node.rtc.sdp.type === 'offer' ) {
		// 		pc.setRemoteDescription( new RTCSessionDescription( node.rtc.sdp ) ).
		// 			then( () => pc.createAnswer() ).
		// 			then( answer => pc.setLocalDescription( answer ) ).
		// 			then( () => {
		// 				console.log( 'Zobelek' );
		// 				// this.db.doc( 'nodes/' + this.ss.cID$.getValue() ).update( {
		// 				// 	'rtc.answer': JSON.stringify( pc.localDescription )
		// 				// } );
		// 			} );
		// 	}
		// 	console.log( node.rtc );
		// } );
	}

	private handleRTC = async ( settings: SettingsRTC ) => {
		console.log( 'We are at handleRTC' );
		const nodeRef = this.db.doc<any>( 'nodes/' + this.ss.cID$.getValue() );
		await nodeRef.update( { rtc: {} } );
		console.log( 'Node RTC portion is now cleared' );
		console.log( settings.servers );
		this.pc = new RTCPeerConnection( settings.servers );
		console.log( 'pc is created' );
		this.pc.onicecandidate = ( candidate ) => {
			console.log( 'We have ice candidate', candidate.type );
			if ( candidate.candidate ) {
				nodeRef.update( {
					'rtc.offerice': firestore.FieldValue.arrayUnion( JSON.stringify( { 'ice': candidate.candidate } ) )
				} );
			}
		};
		console.log( 'We are now listening for onicecandidate' );
		const dc = this.pc.createDataChannel( 'test' );
		console.log( 'Data channel is now created' );
		dc.onopen = () => {
			console.log( 'Data channel is now open' );
			dc.send( 'zobelek' );
			console.log( 'Message is now sent' );
			dc.onmessage = ( event ) => {
				console.log( 'DC message received:', event.data );
			};
		};
		const offer = await this.pc.createOffer();
		console.log( 'offer is created' );
		await this.pc.setLocalDescription( offer );
		console.log( 'Local description is set' );
		console.log( 'We will now register the offer to firestore' );
		await nodeRef.update( {
			rtc: {
				offer: JSON.stringify( this.pc.localDescription )
			}
		} );
		console.log( 'We will now wait for the answer' );
		nodeRef.valueChanges().pipe( filter( n => n.rtc.answer ), take( 1 ) ).subscribe( async ( n: Node ) => {
			console.log( 'Answer is now received' );
			await this.pc.setRemoteDescription( JSON.parse( n.rtc.answer ) );
			await nodeRef.update( { 'rtc.answer': null } );
		} );
		nodeRef.valueChanges().pipe( filter( n => n.rtc.answerice ) ).subscribe( async ( n: Node ) => {
			console.log( 'Answer ice received', Array.isArray( n.rtc.answerice ) );
			if ( Array.isArray( n.rtc.answerice ) ) {
				n.rtc.answerice.forEach( ic => {
					this.pc.addIceCandidate( ( JSON.parse( ic ) ).ice );
				} );
			}
		} );
	}
}


// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, AfterContentInit } from '@angular/core';
// import { Terminal } from 'xterm';
// import { fit } from 'xterm/lib/addons/fit/fit';
// import { subsCreate, subsDispose } from 'src/utilities/ngUtilities';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { SharedService } from 'src/app/shared/shared.service';
// import { filter, map, withLatestFrom } from 'rxjs/operators';
// import { ItemType } from 'src/app/models/generic.models';
// import { Node, defaultNode } from 'src/app/models/node.models';
// import { SortByDateValue } from 'src/utilities/utilityFunctions';
// import { firestore } from 'firebase/app';
// import { BehaviorSubject, combineLatest } from 'rxjs';

// @Component( {
// 	selector: 'app-admin-node-console',
// 	templateUrl: './admin-node-console.component.html',
// 	styleUrls: [ './admin-node-console.component.scss' ]
// } )
// export class AdminNodeConsoleComponent implements OnInit, AfterContentInit, OnDestroy {
// 	public screenHeight = 300;
// 	public screenWidth = 100;
// 	private afterInited = false;
// 	@ViewChild( 'terminal' ) terminal: ElementRef;

// 	public node: Node = defaultNode();
// 	public term: Terminal;

// 	private terminalDimensions$ = new BehaviorSubject( { cols: 0, rows: 0 } );

// 	private subs = subsCreate();

// 	@HostListener( 'window:resize', [ '$event' ] ) onResize( event?) {
// 		if ( this.afterInited ) {
// 			this.screenHeight = window.innerHeight;
// 			this.screenWidth = window.innerWidth;
// 			setTimeout( () => fit( this.term ), 1 );
// 		} else {
// 			setTimeout( () => this.onResize(), 1000 );
// 			console.log( 'Host listener, is called but doing nothing, afterinited is false, we will retry in 1 sec' );
// 		}
// 	}
// 	constructor(
// 		private ss: SharedService,
// 		private db: AngularFirestore
// 	) { }

// 	ngOnInit() {
// 		// this.subs.push(
// 		// 	combineLatest(
// 		// 		this.ss.cItem$.pipe( filter( i => !!i.id ), map( i => ( { ...i, type: ItemType.node } as Node ) ) ),
// 		// 		this.terminalDimensions$
// 		// 	).subscribe( async ( [ i, terminalDims ] ) => {
// 		// 		this.node = i;
// 		// 		if ( this.term ) this.term.focus();
// 		// 		if ( this.node.responses ) {
// 		// 			this.node.responses.forEach( re => re.dateValue = re.date.toDate() );
// 		// 			this.node.responses.sort( SortByDateValue );
// 		// 			if ( this.node.responses.length > 0 ) {
// 		// 				await this.waitForConsole();
// 		// 				const response = this.node.responses.shift();
// 		// 				this.term.write( response.datum );
// 		// 				delete response.dateValue;
// 		// 				await this.db.doc( '/nodes/' + this.node.id ).update( { responses: firestore.FieldValue.arrayRemove( response ) } );
// 		// 			}
// 		// 		}
// 		// 		await this.db.doc( '/nodes/' + this.node.id ).update( {
// 		// 			'terminal.dimensions.cols': terminalDims.cols,
// 		// 			'terminal.dimensions.rows': terminalDims.rows
// 		// 		} ).catch( console.error );
// 		// 	} )
// 		// );
// 	}

// 	private waitForConsole = () => {
// 		return new Promise( ( resolve, reject ) => {
// 			if ( this.term ) {
// 				resolve();
// 			} else {
// 				setTimeout( this.waitForConsole, 200 );
// 			}
// 		} );
// 	}

// 	ngOnDestroy() { subsDispose( this.subs ); }

// 	ngAfterContentInit() {
// 		this.afterInited = true;
// 		this.term = new Terminal( { cursorBlink: true, scrollback: 60, rows: 1, cols: 10 } );
// 		this.term.on( 'key', ( key, event ) => {
// 			this.db.doc( '/nodes/' + this.node.id ).
// 				update( { keypresses: firestore.FieldValue.arrayUnion( { key, date: new Date() } ) } );
// 		} );
// 		this.term.on( 'resize', ( resizeData: { cols: number, rows: number } ) => {
// 			this.terminalDimensions$.next( resizeData );
// 		} );
// 		this.term.open( this.terminal.nativeElement );
// 		this.term.clear();
// 		this.onResize();
// 	}

// 	public windowResized = () => {

// 	}

// }
