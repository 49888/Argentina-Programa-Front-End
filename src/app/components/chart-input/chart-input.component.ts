import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-input',
  template: `
    <div class="chart-input" >

      <div class="chart mx-auto" (mousemove)="drag($event)">
        <canvas baseChart [type]="'doughnut'" [legend]="true" [labels]="labels" [datasets]="datasets" [options]="options"></canvas>
      </div>

      <h4 class="p-2 text-center text-dark">{{value}}%</h4>
    </div>
  `,
  styles: [
    `
    .chart {
      width: 150px;
      box-sizing: content-box;
    }
    `
  ]
})
export class ChartInputComponent implements OnInit, OnChanges {

  @Input('value') value:number = 50;

  @Output() emiter = new EventEmitter<number>();

  //Chart
    protected labels:string[] | undefined;

    protected datasets:ChartConfiguration<'doughnut'>['data']['datasets'] = []

    protected options:ChartConfiguration<'doughnut'>['options'] = {

      events: [],

      animation: false,

      elements: {
        arc: {
          borderWidth: 0,
          offset: 1
        }
      },
  
      datasets: {
        doughnut: {
          backgroundColor: ['rgb(255, 99, 0)','rgb(100, 100, 100)']
        }
      }
    }
  //*/

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.datasets = [{ 
      data: [this.value, 100 - this.value]
    }]
  }

  ngOnInit(): void {
    Chart.overrides.doughnut.cutout = 50;

    this.datasets = [{ 
      data: [this.value, 100 - this.value]
    }]
  }

  protected drag(e:any){

    if(e.buttons === 1){

      let x = e.offsetX;
      let width = e.target.offsetWidth;
      

      console.log();

      this.value = Math.floor((width - x) * 100 / width);

      this.datasets = [{ 
        data: [this.value, 100 - this.value]
      }]

      this.emiter.emit(this.value);
    }
  }

}
