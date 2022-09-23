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

          <div class="col mx-3" *ngFor="let item of (skills$ | async); index as i;">

            <app-chart  [value]="item"></app-chart>
          </div>

        </div>
 
        <div *ngIf="(edit$ | async)" class="position-relative" style="height: 50px;">
          <!-- create buttom-->
          <button class="btn btn-success position-absolute bottom-0 end-0" (click)="createModal.showModal()">Add</button>

          <!-- create modal -->
          <app-modal-create-chart [title]="'Añadir'" [table]="'skills'" #createModal>
            <div class="mb-3">
              <input type="text" class="form-control" name="title" placeholder="Titulo">
            </div>
            <app-chart-input (emiter)="getChartInputValue($event)" [value]="(percentage)"></app-chart-input>
            <div class="mb-3">
              <input type="number" class="form-control" name="percentage" [value]="percentage" (change)="percentageInputChange($event)" min="0" max="100" placeholder="Porcentaje">
            </div>
          </app-modal-create-chart>

      </div>
    </div>
  `,

  styles: []
})
export class SkillsComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected skills$:Observable<Skill[] | undefined> = new Observable();


  protected percentage:number = 50;


  constructor(private store:Store<any>){

    Chart.overrides.doughnut.cutout = 50;
  }

  ngOnInit():void {

    this.skills$ = this.store.select(selectDataSkills);

    this.edit$ = this.store.select(selectEditState);

  }

  getChartInputValue(e:any){

    this.percentage = e as number;
  }

  percentageInputChange(e:any){

    this.percentage = e.target.value;
  }
}
