import { Component } from '@angular/core';
import { QuestionsService } from '../providers/questions/questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public questions = [];
  public payload;

  constructor(public questionsService: QuestionsService) {
    this.getQuestions();
    this.payload = {
      answers: {}
    }
  }

  async getQuestions() {
    await this.questionsService.getConfig().subscribe(res => {
      this.questions = this.objectToArray(res.questions);
      this.questions.map((data) => {
        data.options = this.objectToArray(data.options);
      });
    }, err => {
      console.log(err);
    });
  }

  async sendResult() {
    await this.questionsService.sendQuotations(this.payload).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  select(option, key, value) {
    this.payload.answers[key] = value;
    let hidden = (option.action === 'show') ? false : true;
    this.questions.map(item => {
      if(item.key === option.target) {
        item.hidden = hidden;
      }
    });
  }

  objectToArray(obj) {
    let arr = [];

    Object.keys(obj).map(function(key, index) {
      obj[key].key = key;

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
