import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDataEducation, selectEditState } from 'src/app/state/AppSelectors';
import { CardData } from '../../models/models';



@Component({
  selector: 'app-education',

  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Educacion</h4>
      <div class="container-fluid">
        
        <app-card *ngFor="let item of (education$ | async); index as i;" [values]="item" [list]="'education'"></app-card>
          
      </div>
    </div>
  `,

  styles: []
})
export class EducationComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected education$:Observable<CardData[] | undefined> = new Observable();

  constructor(private store:Store<any>) { }

  ngOnInit(): void {

    this.education$ = this.store.select(selectDataEducation);

    this.edit$ = this.store.select(selectEditState);
  }

}
