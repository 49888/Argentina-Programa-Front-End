import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/models';
import { DB } from 'src/app/services/db.services';
import { selectData, selectLoading } from 'src/app/state/selectors';
import { load, loaded } from '../../state/actions';

@Component({
  selector: 'app-main',

  template: `
    <h4>Loading: {{loading$ | async | json}}</h4>
    <main class="container-fluid bg-dark text-light" *ngIf="!(loading$ | async)">

      <div class="row">
        <div class="col-lg-6 col-xs-12">
          <app-banner [edit]="user != null" [data]="(data$ | async)?.banner"></app-banner>
        </div>

        <div class="col-lg-6 col-xs-12 container-fluid">

          <app-experience [data]="(data$ | async)?.experience"></app-experience>

          <app-education [data]="(data$ | async)?.education"></app-education>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-6 col-xs-12">
          <app-skills [data]="(data$ | async)?.skills"></app-skills>
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

  protected loading$:Observable<boolean> = new Observable();

  protected user:object | null = {};

  date = {

    banner: {
      name: 'Franco Javier Gadea',
      bannerImg: 'assets/image/banner.jpg',
      perfilImg: 'assets/image/perfil.png',
      info: 'lorem',
      title: 'Desarrollador Full Stack'
    },

    experience: [
      {
        title: 'Repartidor de Rappi',
        description: 'Fui repartidor durante el año 2022',
        img: 'assets/image/rappi.webp'
      }
    ],

    education: [
      {
        title: 'Colegio Nacional',
        description: 'Secuandario completo',
        img: 'assets/image/colegio.png'
      },
      {
        title: 'Universidad Tecnologica Nacional',
        description: 'Cursando Ingenieria en Sistemas de Informacion',
        img: 'assets/image/utn.png'
      }
    ],

    skills: [
      {
        title: 'JavaScript',
        percentage: 70,
        img: 'assets/image/javascript.png'
      },
      {
        title: 'React',
        percentage: 40,
        img: 'assets/image/react.png'
      },
      {
        title: 'Angular',
        percentage: 30,
        img: 'assets/image/angular.png'
      },
      {
        title: 'Java',
        percentage: 60,
        img: 'assets/image/java.png'
      }
    ]
  }

  protected data:any = null;

  protected data$:Observable<Data | null> = new Observable();

  constructor(private store:Store<any>, private db:DB){}

  ngOnInit(): void {

    this.store.dispatch(load());

    this.loading$ = this.store.select(selectLoading);

    this.data$ = this.store.select(selectData);

    this.db.getData().subscribe((data)=>{

      //this.data = data;

      this.store.dispatch(loaded(data));
    });
  }

  
}
