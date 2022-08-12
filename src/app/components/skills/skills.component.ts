import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { selectDataSkills, selectEditState } from 'src/app/state/AppSelectors';
import { Skill } from '../../models/models';


@Component({
  selector: 'app-skills',

  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Skills</h4>
      <div class="container-fluid">
        
        <div class="row">

          <app-chart *ngFor="let item of (skills$ | async); index as i;" [value]="item" class="col"></app-chart>

        </div>


        <div class="row">

        </div>

      </div>
    </div>
  `,

  styles: []
})
export class SkillsComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected skills$:Observable<Skill[] | undefined> = new Observable();


  constructor(private store:Store<any>){

    Chart.overrides.doughnut.cutout = 50;
  }

  ngOnInit():void {

    this.skills$ = this.store.select(selectDataSkills);

    this.edit$ = this.store.select(selectEditState);

  }

}
