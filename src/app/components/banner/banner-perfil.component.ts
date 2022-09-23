import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectEditState } from "src/app/state/AppSelectors";


@Component({
    selector: 'app-banner-perfil',

    template: `
        <!--Perfil image and name-->
        <div class="p-2" style="margin-top: -100px !important;">
            <div>
                <div class="perfil mx-auto position-relative">
                    <img [src]="image" alt="perfil">

                    <button class="btn btn-primary rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)" (click)="modalImage.showModal()"><i class="bi bi-upload"></i></button>
                    <!--Update Image-->
                    <app-modal-cropper title="Cambiar foto de perfil" type="circle" [table]="'banner'" [to]="'perfil'"  #modalImage></app-modal-cropper>
                </div>
            </div>
            
            <div class="text-center position-relative">
                <h5>{{ name }}</h5>

                <button class="btn btn-success rounded-circle position-absolute top-0 start-100 translate-middle" *ngIf="(edit$ | async)" (click)="modalName.showModal()"><i class="bi bi-pencil fs-6"></i></button>  
                <!--Update Name-->
                <app-modal [title]=" 'Cambiar Nombre' " [table]="'banner'" #modalName>
                    <div class="mb-3">
                        <input type="text" class="form-control" name="name" placeholder="nombre" [value]="name">
                    </div>
                </app-modal>
            </div>
        </div>    
    `,

    styles: [`
        img {
            width: 100%;  height: 100%;
            object-fit: cover;
        }
        .perfil {
            width: 150px;
            height: 150px;
            overflow: hidden;
            border-radius: 50%;
        }
    `]
})
export class BannerPerfilComponent implements OnInit {

    @Input() image:string | undefined | null = undefined;

    @Input() name:string | undefined | null = undefined;

    protected edit$:Observable<boolean> = new Observable();

    constructor(private store:Store<any>){}
    
    ngOnInit(): void {
        
        this.edit$ = this.store.select(selectEditState);
    }
}