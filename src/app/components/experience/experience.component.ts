import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDataExperience, selectEditState } from 'src/app/state/AppSelectors';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-experience',
  
  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Experiencia</h4>
      <div class="container-fluid">
        
        <app-card *ngFor="let item of (experience$ | async); index as i;" [values]="item"></app-card>

      </div>
    </div>
  `,

  styles: []
})
export class ExperienceComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected experience$:Observable<CardData[] | undefined> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit():void {

    this.experience$ = this.store.select(selectDataExperience);

    this.edit$ = this.store.select(selectEditState);
  }

}
