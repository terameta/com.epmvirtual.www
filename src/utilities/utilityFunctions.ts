export function SortByName( e1: any, e2: any ) { if ( e1.name > e2.name ) { return 1; } else if ( e1.name < e2.name ) { return -1; } else { return 0; } }
export function SortByDate( e1: any, e2: any ) { if ( e1.date > e2.date ) { return 1; } else if ( e1.date < e2.date ) { return -1; } else { return 0; } }
export function SortByDateDesc( e1: any, e2: any ) { if ( e1.date > e2.date ) { return -1; } else if ( e1.date < e2.date ) { return 1; } else { return 0; } }
export function SortByDescription( e1: any, e2: any ) { if ( e1.description > e2.description ) { return 1; } else if ( e1.description < e2.description ) { return -1; } else { return 0; } }
export function SortById( e1: any, e2: any ) { if ( e1.id > e2.id ) { return 1; } else if ( e1.id < e2.id ) { return -1; } else { return 0; } }
export function SortByIdDesc( e1: any, e2: any ) { if ( e1.id > e2.id ) { return -1; } else if ( e1.id < e2.id ) { return 1; } else { return 0; } }
export function SortByPosition( e1: any, e2: any ) { if ( e1.position > e2.position ) { return 1; } else if ( e1.position < e2.position ) { return -1; } else { return 0; } }
export function SortByNothing( e1: any, e2: any ) { return 0; }
export function isNumeric( n: any ) { return !isNaN( parseFloat( n ) ) && isFinite( n ); }
export function isInt( n: any ) { return isNumeric( n ) && n % 1 === 0; }

export const JSONDeepCopy = ( payload ) => JSON.parse( JSON.stringify( payload ) );
