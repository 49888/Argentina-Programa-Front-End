import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';

@Component({
    selector: 'app-card-title-description',

    template: `
        <h5>{{title}}</h5>

        <p>{{description}}</p>
    
        <div class="position-absolute top-0 start-100">
          <!--Update button-->
          <button class="btn btn-success rounded-circle" *ngIf="(edit$ | async)" (click)="updateModal.showModal()"><i class="bi bi-pencil fs-6"></i></button>
        
          <!-- Delete Button -->
          <button class="btn btn-danger rounded-circle my-1" *ngIf="(edit$ | async)" (click)="deleteModal.showModal()"><i class="bi bi-trash"></i></button>
        </div>

        <!-- Update Modal -->
        <app-modal title="Editar" title="Editar" table="{{table}}" #updateModal>
          <div class="mb-3">
            <input type="text" class="form-control" name="title" placeholder="Titulo" value="{{title}}">
          </div>

          <div class="mb-3">
            <textarea class="form-control" rows="3" name="description" placeholder="Descripcion" value="{{description}}"></textarea>
          </div>

          <input type="number" value="{{id}}" name="id" style="display: none;">
        </app-modal>

        <!-- Delete Modal -->
        <app-modal-delete title="Eliminar" table="{{table}}" #deleteModal>

          <input type="number" name="id"  [value]="id" style="display: none;">
          
        </app-modal-delete>
    `
})
export class CardTitleDescriptionComponent implements OnInit {

    protected edit$:Observable<boolean> = new Observable();

    @Input() title:string | null | undefined = undefined;

    @Input() description:string | null | undefined = undefined;

    @Input() table:string | null | undefined = undefined;

    @Input() id:number | null | undefined = undefined;

    constructor(private store:Store<any>){}

    ngOnInit(){

        this.edit$ = this.store.select(selectEditState);
    }
}