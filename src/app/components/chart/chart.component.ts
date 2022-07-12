import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType, Chart } from 'chart.js';

import { Skill } from '../../models/models';


@Component({
  selector: 'app-chart',
  template: `
    <div>
      <h6 class="text-center">{{value?.title}}</h6>

      <div class="chart mx-auto">
        <canvas baseChart [data]="ChartData" [type]="Type" [options]="ChartOptions"></canvas>
        <img [src]="value?.img" alt="">
      </div>

      <h6 class="text-center">{{value?.percentage}}%</h6>
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


  constructor() {
    console.log(this.value);

    

    
  }
  

  ngOnInit(): void {

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
