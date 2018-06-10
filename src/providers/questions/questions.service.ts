import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionsService {
  constructor(public api: ApiService) {}

  getConfig() {
    return this.api.get('config')
    .catch(this.api.handleError)
    .map(this.api.extractData);
  }

  sendQuotations(params: any) {
    return this.api.post('quotations', params)
    .catch(this.api.handleError)
    .map(this.api.extractData);
  }

}
