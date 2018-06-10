import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionsService } from '../providers/questions/questions.service';
import { ApiService } from '../providers/api/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ApiService,
    QuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
