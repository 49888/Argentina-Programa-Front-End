import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectEditState } from "src/app/state/AppSelectors";


@Component({
    selector: 'app-banner-title-info',

    template: `
        <!--Title and info-->
        
        <h3>{{ title }} </h3>

        <p class="m-0">{{ info }}</p>

        <button class="btn btn-success rounded-circle position-absolute top-0 end-0" *ngIf="(edit$ | async)" (click)="modal.showModal()"><i class="bi bi-pencil fs-6"></i></button>
        
        <!--Update Title and info-->
        <app-modal [title]=" 'Cambiar Titulo o Info' " [table]="'banner'" #modal>
            <div class="mb-3">
                <input type="text" class="form-control" name="title" placeholder="Titulo" [value]="title">
            </div>
            <div class="mb-3">
                <textarea class="form-control" rows="7" name="information" placeholder="Info" [value]="info"></textarea>
            </div>
        </app-modal> 
    `,

    styles: [``]
})
export class BannerTitleInfoComponent implements OnInit {

    @Input() title:string | undefined | null = undefined;

    @Input() info:string | undefined | null = undefined;

    protected edit$:Observable<boolean> = new Observable();

    constructor(private store:Store<any>){}
    
    ngOnInit(): void {
        
        this.edit$ = this.store.select(selectEditState);
    }
}