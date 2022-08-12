import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/models';

import { selectData, selectEditState, selectLoading } from 'src/app/state/AppSelectors';
import { load } from '../../state/AppActions';

@Component({
  selector: 'app-main',

  template: `
    <h4>Loading: {{loading$ | async | json}} Edit mode: {{edit$ | async | json}}</h4>
    <main class="container-fluid bg-dark text-light" *ngIf="!(loading$ | async)">

      <div class="row">
        <div class="col-lg-6 col-xs-12">
          <app-banner></app-banner>

          <app-skills></app-skills>
        </div>

        <div class="col-lg-6 col-xs-12 container-fluid">

          <app-experience></app-experience>

          <app-education></app-education>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-6 col-xs-12">
          
        </div>

        <div class="col-lg-6 col-xs-12 container-fluid">

          <app-projects></app-projects>
        </div>
      </div>

    </main>
  `,

  styles: []
})
export class MainComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected loading$:Observable<boolean> = new Observable();

  protected user:object | null = {};


  protected data$:Observable<Data | null> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.loading$ = this.store.select(selectLoading);

    this.data$ = this.store.select(selectData);

    this.edit$ = this.store.select(selectEditState);

    this.store.dispatch(load());
  }

  
}
