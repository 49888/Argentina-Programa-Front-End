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
        
        <app-card *ngFor="let item of (experience$ | async); index as i;" [values]="item" [list]="'experience'" [imageId]="item.id"></app-card>

      </div>

      <div *ngIf="(edit$ | async)" class="position-relative" style="height: 50px;">
        <!-- create buttom-->
        <button class="btn btn-success position-absolute bottom-0 end-0" (click)="createModal.showModal()">Add</button>

        <!-- create modal -->
        <app-modal-create title="Agregar" [title]="'Agregar'" [table]="'experience'" #createModal>
          <div class="mb-3">
            <input type="text" class="form-control" name="title" placeholder="Titulo">
          </div>
          <div class="mb-3">
            <textarea class="form-control" rows="3" name="description" placeholder="Descripcion"></textarea>
          </div>
        </app-modal-create>
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
