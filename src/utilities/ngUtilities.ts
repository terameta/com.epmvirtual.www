import { Subscription } from 'rxjs';

export const subsDispose = ( subscriptions: Subscription[] ) => subscriptions.forEach( s => { s.unsubscribe(); s = null; } );
export const subsCreate = () => <Subscription[]>[];
