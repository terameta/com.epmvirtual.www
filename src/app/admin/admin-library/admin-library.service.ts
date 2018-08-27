import { Injectable } from '@angular/core';

@Injectable( {
	providedIn: 'root'
} )
export class AdminLibraryService {
	public concept = 'library';

	constructor() { }
}
