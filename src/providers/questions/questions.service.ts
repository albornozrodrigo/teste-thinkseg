import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { ApiService } from '../api/api.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionsService {
  constructor(public api: ApiService) {}

  getConfig() {
    return this.api.get('config')
    .map(this.api.extractData);
  }

  sendQuotations(params: any) {
    return this.api.post('quotations', params)
    .map(this.api.extractData);
  }

}
