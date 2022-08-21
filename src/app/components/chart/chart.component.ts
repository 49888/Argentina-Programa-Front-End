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

      <div class="position-absolute top-0 start-100 translate-middle-x">
        <!-- Update Button -->
        <button class="btn btn-success rounded-circle my-1" *ngIf="(edit$ | async)" (click)="updateModal.showModal()"><i class="bi bi-pencil fs-6"></i></button>
        
        <!-- Delete Button -->
        <button class="btn btn-danger rounded-circle my-1" *ngIf="(edit$ | async)" (click)="deleteModal.showModal()"><i class="bi bi-trash"></i></button>
      </div>
      
      <!-- Update Modal -->
      <app-modal-chart [title]="'Editar'" [table]="'skills'" #updateModal>
        <div class="mb-3">
          <input type="text" class="form-control" name="title" [value]="value?.title">
        </div>
        <app-chart-input (emiter)="getChartInputValue($event)" [value]="(percentage)"></app-chart-input>
        <div class="mb-3">
          <input type="number" class="form-control" name="percentage" [value]="percentage" (change)="percentageInputChange($event)" min="0" max="100">
        </div>
        <input type="number" name="id"  [value]="value?.id" style="display: none;">
      </app-modal-chart>
     
      <!-- Delete Modal -->
      <app-modal-delete title="Eliminar" table="skills" #deleteModal>
        <input type="number" name="id"  [value]="value?.id" style="display: none;">
      </app-modal-delete>
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
export class ChartComponent implements OnInit {

  
  @Input() value:Skill | null = null;

  protected percentage:number = 50;


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

  constructor(private store:Store<any>){}
  

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);

    if(this.value) this.percentage = this.value.percentage as number;
    
    if(this.value){

      let {percentage} = this.value;

      this.ChartData = {
    
        datasets: [{ 
          data: [(percentage ? percentage : 0), 100 - (percentage ? percentage : 0)]
        }],
      };
    }


  }

  getChartInputValue(e:any){

    this.percentage = e as number;
  }

  percentageInputChange(e:any){

    this.percentage = e.target.value;
  }
}
