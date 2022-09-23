import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectEditState } from "src/app/state/AppSelectors";


@Component({
    selector: 'app-banner-image',

    template: `
        <!--Banner-->  
        <div class="banner position-relative">
            <img [src]="image" alt="banner">
            
            <button class="btn btn-primary rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)" (click)="modal.showModal()"><i class="bi bi-upload"></i></button>
            
            <!--Update Banner Image-->
            <app-modal-cropper title="Cambiar imagen del Banner" type="rectangle" [table]="'banner'" [to]="'banner'" #modal></app-modal-cropper>
        </div>
    `,

    styles: [`
        img {
            width: 100%;  height: 100%;
            object-fit: cover;
        }
        .banner {
            width: 100%;
            height: 250px;
        }
    `]
})
export class BannerImageComponent implements OnInit {

    @Input() image:string | undefined | null = undefined;

    protected edit$:Observable<boolean> = new Observable();

    constructor(private store:Store<any>){}
    
    ngOnInit(): void {
        
        this.edit$ = this.store.select(selectEditState);
    }
}