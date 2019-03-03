export function SortByName( e1: any, e2: any ) { if ( e1.name > e2.name ) { return 1; } else if ( e1.name < e2.name ) { return -1; } else { return 0; } }
export function SortByDate( e1: any, e2: any ) { if ( e1.date > e2.date ) { return 1; } else if ( e1.date < e2.date ) { return -1; } else { return 0; } }
export function SortByDateValue( e1: any, e2: any ) { if ( e1.dateValue > e2.dateValue ) { return 1; } else if ( e1.dateValue < e2.dateValue ) { return -1; } else { return 0; } }
export function SortByDateDesc( e1: any, e2: any ) { if ( e1.date > e2.date ) { return -1; } else if ( e1.date < e2.date ) { return 1; } else { return 0; } }
export function SortByDescription( e1: any, e2: any ) { if ( e1.description > e2.description ) { return 1; } else if ( e1.description < e2.description ) { return -1; } else { return 0; } }
export function SortById( e1: any, e2: any ) { if ( e1.id > e2.id ) { return 1; } else if ( e1.id < e2.id ) { return -1; } else { return 0; } }
export function SortByIdDesc( e1: any, e2: any ) { if ( e1.id > e2.id ) { return -1; } else if ( e1.id < e2.id ) { return 1; } else { return 0; } }
export function SortByPosition( e1: any, e2: any ) { if ( e1.position > e2.position ) { return 1; } else if ( e1.position < e2.position ) { return -1; } else { return 0; } }
export function SortByNothing( e1: any, e2: any ) { return 0; }
export function isNumeric( n: any ) { return !isNaN( parseFloat( n ) ) && isFinite( n ); }
export function isInt( n: any ) { return isNumeric( n ) && n % 1 === 0; }

export const JSONDeepCopy = ( payload ) => JSON.parse( JSON.stringify( payload ) );

// export const enum2array = ( payload: any ) => Object.entries( payload ).filter( p => isNumeric( p[ 1 ] ) ).map( p => ( { label: p[ 0 ], value: p[ 1 ] } ) );
export const enum2array = ( payload: any ) => {
	// console.log( payload );
	// Object.entries( payload ).forEach( e => console.log( e ) );
	return Object.entries( payload ).filter( p => !isNumeric( p[ 0 ] ) ).map( p => ( { label: p[ 0 ], value: p[ 1 ] } ) );
};
