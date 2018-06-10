import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../providers/questions/questions.service';
import { LoaderService } from "../providers/loader/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public questions = [];
  public payload;
  public error;
  public result;

  constructor(public questionsService: QuestionsService, public loader: LoaderService) {
    this.loader.subscribe();
  }

  ngOnInit() {
    this.getQuestions();
    this.error = false;
    this.payload = {
      answers: {}
    }
  }

  async getQuestions() {
    this.loader.show();
    await this.questionsService.getConfig().subscribe(res => {
      this.questions = this.objectToArray(res.questions);
      this.questions.map((data) => {
        data.options = this.objectToArray(data.options);
      });
      this.loader.hide();
    }, err => {
      console.log(err);
      this.error = true;
      this.loader.hide();
    });
  }

  async sendResult() {
    this.loader.show();
    this.payload.answers = {};
    this.questions.map(question => {
      if(question.model && !question.hidden) {
        this.payload.answers[question.key] = question.model;
      }
    });

    await this.questionsService.sendQuotations(this.payload).subscribe(res => {
      this.result = res.cool_level;
      this.loader.hide();
    }, err => {
      console.log(err);
      this.error = true;
      this.loader.hide();
    });
  }

  select(option) {
    let hidden = (option.action === 'show') ? false : true;
    this.questions.map(item => {
      if(item.key === option.target) {
        item.hidden = hidden;
      }
    });
  }

  private objectToArray(obj) {
    let arr = [];

    Object.keys(obj).map(function(key, index) {
      obj[key].key = key;
      obj[key].model = null;

      if(obj[key].hasOwnProperty('show')) {
        obj[key].action = 'show';
        obj[key].target = obj[key].show;
        delete obj[key].show;
      }

      if(obj[key].hasOwnProperty('hide')) {
        obj[key].action = 'hide';
        obj[key].target = obj[key].hide;
        delete obj[key].hide;
      }

      arr.push(obj[key]);
    });

    return arr;
  }
}
