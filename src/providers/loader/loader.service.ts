import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class LoaderService {
	private handler = new Subject<boolean>();

	constructor() {}

	show() {
		this.handler.next(true);
	}

	hide() {
		this.handler.next(false);
	}

	subscribe(callback?: any): Subscription {
		return this.handler.subscribe(callback);
	}

	unsubscribe() {
		this.handler.unsubscribe();
	}

}
