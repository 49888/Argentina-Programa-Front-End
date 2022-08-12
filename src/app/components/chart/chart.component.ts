import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType, Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';

import { Skill } from '../../models/models';


@Component({
  selector: 'app-chart',
  template: `
    <div class="position-relative">
      <h6 class="text-center">{{value?.title}}</h6>

      <div class="chart mx-auto">
        <canvas baseChart [data]="ChartData" [type]="Type" [options]="ChartOptions"></canvas>
        <img [src]="value?.img" alt="">
      </div>

      <h6 class="text-center">{{value?.percentage}}%</h6>

      <button class="btn btn-success rounded-circle position-absolute top-0 start-100 translate-middle-x" *ngIf="(edit$ | async)"><i class="bi bi-pencil fs-6"></i></button>
    </div>
  `,
  styles: [
    `
      .chart {
        width: 150px;
        position: relative;
      }
      .chart img {
        width: 50px; height: 50px;
        object-fit: scale-down;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    `
  ]
})
export class ChartComponent implements OnInit, OnChanges {

  
  @Input() value:Skill | null = null;

  protected edit$:Observable<boolean> = new Observable();

  public ChartData: ChartData<'doughnut'> | undefined;

  public Type:ChartType = 'doughnut';

  public ChartOptions:ChartConfiguration['options'] = {
    events: [],
    
    layout: {
      padding: {
        bottom: 10
      }
    },
    
    elements: {
      arc: {
        borderWidth: 0
      }
    },

    datasets: {
      doughnut: {
        backgroundColor: ['rgb(255, 99, 0)','rgb(100, 100, 100)']
      }
    }

  }

  /*// events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  //*/


  constructor(private store:Store<any>){}
  

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);

    //let canvas = <HTMLCanvasElement> document.getElementById(this.id);
    
    this.ChartData = {
    
      datasets: [{ 
        data: [this.value!.percentage, 100 - this.value!.percentage]
      }],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
