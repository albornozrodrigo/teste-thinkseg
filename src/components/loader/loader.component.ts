import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../providers/loader/loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit, OnDestroy {
  public status: boolean;
  private subscription: Subscription;

  constructor(private loader: LoaderService) {
    this.subscribe();
  }

  get unsubscribed() {
    return this.subscription && this.subscription.closed;
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  subscribe() {
    this.subscription = this.loader.subscribe(status => {
      this.status = status;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
