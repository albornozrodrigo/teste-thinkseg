import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ApiService } from '../providers/api/api.service';
import { QuestionsService } from '../providers/questions/questions.service';
import { LoaderService } from '../providers/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    LoadingModule
  ],
  providers: [
    ApiService,
    QuestionsService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
