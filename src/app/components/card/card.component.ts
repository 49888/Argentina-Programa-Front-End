import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-card',

  template: `
    <div class="row p-2 m-2 position-relative">
      <div class="col-3 Logo position-relative">
        <img [src]="values?.img" alt="image">

        <!--Update Image-->
        <button class="btn btn-primary rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)" (click)="modalImage.showModal()"><i class="bi bi-upload"></i></button>
        <app-modal-cropper title="Cambiar imagen" type="none" [table]="list" [imageId]="imageId" #modalImage></app-modal-cropper>
      </div>
      
      <div class="col-9">
        <h5>{{values?.title}}</h5>
        <p>
          {{values?.description}}
        </p>

        <div class="position-absolute top-0 start-100">
          <!--Update button-->
          <button class="btn btn-success rounded-circle" *ngIf="(edit$ | async)" (click)="updateModal.showModal()"><i class="bi bi-pencil fs-6"></i></button>
        
          <!-- Delete Button -->
          <button class="btn btn-danger rounded-circle my-1" *ngIf="(edit$ | async)" (click)="deleteModal.showModal()"><i class="bi bi-trash"></i></button>
        </div>
        
        <!-- Update Modal -->
        <app-modal title="Editar" [title]="'Editar'" [table]="list" #updateModal>
          <div class="mb-3">
            <input type="text" class="form-control" name="title" placeholder="Titulo" value="{{values?.title}}">
          </div>
          <div class="mb-3">
            <textarea class="form-control" rows="3" name="description" placeholder="Descripcion" value="{{values?.description}}"></textarea>
          </div>
          <input type="number" value="{{values?.id}}" name="id" style="display: none;">
        </app-modal>

        <!-- Delete Modal -->
        <app-modal-delete title="Eliminar" [table]="list" #deleteModal>
          <input type="number" name="id"  [value]="values?.id" style="display: none;">
        </app-modal-delete>
      </div>
    </div>
  `,

  styles: [
    `
      img {
        width: 100%;  height: 100%;
        object-fit: scale-down;
      }
      .Logo {
        max-width: 150px;
        max-height: 100px;
        overflow: hidden;
      }
    `
  ]
})
export class CardComponent implements OnInit {

  @Input() values:CardData | null = null;

  @Input() list:string = '';

  @Input() imageId:number = -1;

  protected edit$:Observable<boolean> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);
  }

}
