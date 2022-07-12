import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Skill } from '../../models/models';


@Component({
  selector: 'app-skills',

  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Skills</h4>
      <div class="container-fluid">
        
        <div class="row">

          <app-chart *ngFor="let item of data; index as i;" [value]="item" class="col"></app-chart>

        </div>


        <div class="row">

        </div>

      </div>
    </div>
  `,

  styles: []
})
export class SkillsComponent implements OnInit {

  @Input() data:Skill[] | undefined = undefined;


  constructor() {
    Chart.overrides.doughnut.cutout = 50;

    console.log(this.data);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
