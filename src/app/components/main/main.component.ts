import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/models';

import { selectData, selectEditState, selectError, selectLoading } from 'src/app/state/AppSelectors';
import { load } from '../../state/AppActions';

@Component({
  selector: 'app-main',

  template: `

    <!--
      <h4 class="bg-light" style="position: fixed; bottom: 0">Loading: {{loading$ | async | json}} Edit mode: {{edit$ | async | json}}</h4>
    -->

    <main class="container-fluid text-light" *ngIf="!(loading$ | async)">

      <div class="row">
        <div class="col-lg-7 col-xs-12">
          <app-banner></app-banner>

          <app-skills></app-skills>
        </div>

        <div class="col-lg-5 col-xs-12 container-fluid">

          <app-list-card table="experience" title="Experiencia" [data]="(data$ | async)?.experience"></app-list-card>

          <app-list-card table="education" title="Educacion" [data]="(data$ | async)?.education"></app-list-card>

          <app-projects></app-projects>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-6 col-xs-12">
          
        </div>

        <div class="col-lg-6 col-xs-12 container-fluid">


        </div>
      </div>

    </main>

    <div class="Error" *ngIf="(error$ | async)?.error && (loading$ | async)">
      <div class="alert alert-danger w-50" role="alert">
        <h4 class="alert-heading">Ocurrio un Error</h4>
        <hr>
        <p class="mb-0">{{(error$ | async)?.message}}</p>
      </div>
    </div>

    <app-loader *ngIf="(loading$ | async) && !(error$ | async)?.error"></app-loader>

    <app-footer></app-footer>
  `,

  styles: [`
    .Error {
      height: calc(100vh - 96px - 247px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class MainComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected loading$:Observable<boolean> = new Observable();

  protected user:object | null = {};

  protected error$:Observable<any> = new Observable();


  protected data$:Observable<Data | null> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.loading$ = this.store.select(selectLoading);

    this.data$ = this.store.select(selectData);

    this.edit$ = this.store.select(selectEditState);

    this.error$ = this.store.select(selectError);

    this.store.dispatch(load());
  }

  
}
