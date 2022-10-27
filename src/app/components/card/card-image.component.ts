import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';

@Component({
    selector: 'app-card-image',

    template: `
        <div class="Logo position-relative">

            
            <img [src]="image" alt="image">
            

            <!--Update Image-->
            <button class="btn btn-primary rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)" (click)="modal.showModal()"><i class="bi bi-upload"></i></button>
            
            <app-modal-cropper title="Cambiar imagen" type="none" table="{{table}}" [imageId]="id" #modal></app-modal-cropper>
        </div>
    `,

    styles: [`
        .Logo img {
            width: 100%;  height: 100%;
            object-fit: scale-down;
        }
        .Logo {
            max-width: 150px;
            max-height: 100px;
            height: 100%;
        }
    `]
})

export class CardImageComponent implements OnInit {

    protected edit$:Observable<boolean> = new Observable();

    @Input() image:string | null | undefined = undefined;

    @Input() table:string | undefined = undefined;

    @Input() id:number | undefined = undefined;


    constructor(private store:Store<any>){}

    ngOnInit(){

        this.edit$ = this.store.select(selectEditState);
    }
}