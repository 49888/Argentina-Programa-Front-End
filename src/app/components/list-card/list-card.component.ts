import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardData } from 'src/app/models/models';
import { selectEditState } from 'src/app/state/AppSelectors';

@Component({
    selector: 'app-list-card',

    template: `

        <div>
            <h4 class="border-bottom border-light p-2">{{title}}</h4>

            <div class="container-fluid">
                
                <app-card *ngFor="let item of data; index as i;" [values]="item" [table]="table"></app-card>
                
            </div>

            <div *ngIf="(edit$ | async)" class="position-relative" style="height: 50px;">
                <!-- create buttom-->
                <button class="btn btn-success position-absolute bottom-0 end-0" (click)="modal.showModal()">Add</button>

                <!-- create modal -->
                <app-modal-create title="Agregar" [table]="'education'" #modal>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="title" placeholder="Titulo">
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" rows="3" name="description" placeholder="Descripcion"></textarea>
                    </div>
                </app-modal-create>
            </div>
        
        </div>
    `
})

export class ListCardComponent implements OnInit {

    protected edit$:Observable<boolean> = new Observable();

    @Input() title:string | undefined = undefined

    @Input() table:string | undefined = undefined

    @Input() data:CardData[] | undefined = undefined

    constructor(private store:Store<any>){}

    ngOnInit(){
        this.edit$ = this.store.select(selectEditState);
    }
}