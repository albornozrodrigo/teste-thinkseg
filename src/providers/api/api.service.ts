import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private urlBase: string;
	private headers: Headers;
	private options: RequestOptions;

  constructor(public http: Http) {
    this.urlBase = 'https://thinkseg-javascript-test.herokuapp.com';

    this.headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
		if(params) {
			let urlParams = new URLSearchParams();
			for(let i in params) {
				urlParams.set(i, params[i]);
			}

			this.options.search = !this.options.search && urlParams || this.options.search;
		}

		if(options) {
			this.options = new RequestOptions({ ...this.options, ...options});
		}

		return this.http.get(`${this.urlBase}/${endpoint}`, this.options);
  }

  post(endpoint: string, params: any, options?: RequestOptions) {
    return this.http.post(`${this.urlBase}/${endpoint}`, params, this.options);
  }

  extractData(res) {
    var body = res.json();
    return body || {};
  }

  handleError(error: Response | any) {
		let errMsg: string = "Ocorreu um erro, por favor tente novamente.";

        if(error instanceof Response) {
			const body = error.json() || '';
			errMsg = body.errorMessage || errMsg;
		}

		return Observable.throw(errMsg);
	}

}
