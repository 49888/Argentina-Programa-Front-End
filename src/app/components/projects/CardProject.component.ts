import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/models';
import { selectEditState } from 'src/app/state/AppSelectors';

@Component({
    selector: 'app-card-project',

    template: `
        <div class="row p-2 m-2 position-relative">

            <div class="col">

                <h5>{{value?.name}}</h5>
    
                <p>{{value?.description}}</p>
    
    
                <ul class="Redes d-flex my-0" style="list-style: none;">
                    <li class="d-flex align-items-center mx-2">
                        <div>Ver:</div>
                        <a [href]="value?.ghPages" target="_blank" rel="noopener noreferrer"><i class="bi bi-link-45deg"></i></a>
                    </li>
                    <li class="d-flex align-items-center mx-2">
                        <div>Repositorio:</div>
                        <a [href]="value?.github" target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i></a>
                    </li>
                </ul>
    
    
                <div class="position-absolute top-0 start-100">
                    <!--Update button-->
                    <button class="btn btn-success rounded-circle" *ngIf="(edit$ | async)" (click)="updateModal.showModal()"><i class="bi bi-pencil fs-6"></i></button>
    
                    <!-- Delete Button -->
                    <button class="btn btn-danger rounded-circle my-1" *ngIf="(edit$ | async)" (click)="deleteModal.showModal()"><i class="bi bi-trash"></i></button>
                </div>
    
                <!-- Update Modal -->
                <app-modal title="Editar" title="Editar" table="{{table}}" #updateModal>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="name" placeholder="Titulo" value="{{value?.name}}">
                    </div>
    
                    <div class="mb-3">
                        <textarea class="form-control" rows="3" name="description" placeholder="Descripcion" value="{{value?.description}}"></textarea>
                    </div>
    
                    <div class="mb-3">
                        <input type="text" class="form-control" name="github" placeholder="Repositorio de Github" [value]="value?.github">
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="ghPages" placeholder="Web" [value]="value?.ghPages">
                    </div>
    
                    <input type="number" value="{{value?.id}}" name="id" style="display: none;">
                </app-modal>
    
                <!-- Delete Modal -->
                <app-modal-delete title="Eliminar" table="{{table}}" #deleteModal>
    
                    <input type="number" name="id"  [value]="value?.id" style="display: none;">
                
                </app-modal-delete>
            </div>

        </div>
    `,

    styles: [`
        .Redes li a {
            padding: 7px;
        }
        .Redes .bi {
            font-size: 25px;
            color: white;
        }
        .Redes .bi:hover {
            color: #2eea55;
            text-shadow: 0px 0px 4px rgba(128,65,228,0.75);
        }
    `]

})

export class CardProjectComponent implements OnInit {

    protected edit$:Observable<boolean> = new Observable();

    @Input() value:Project | undefined = undefined;

    @Input() table:string | undefined = undefined;

    constructor(private store:Store<any>){}

    ngOnInit(){

        this.edit$ = this.store.select(selectEditState);
    }
}