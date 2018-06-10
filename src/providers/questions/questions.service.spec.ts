import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { QuestionsService } from './questions.service';
import { ApiService } from '../api//api.service';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let api: ApiService;

  beforeEach(() => {
    this.service = new QuestionsService(this.api);
    TestBed.configureTestingModule({
      providers: [QuestionsService]
    });
  });

  it('should be created', inject([QuestionsService], (service: QuestionsService) => {
    expect(service).toBeTruthy();
  }));

  it('#sendQuotations should return value from observable', (done: DoneFn) => {
    let data = {
      answers: {
        likes_thinkseg: "1",
        likes_beer: "0"
      }
    }

    this.service.sendQuotations(data).subscribe(value => {
      expect(value).toBe({ cool_level: 20 });
      done();
    });
  });
});
