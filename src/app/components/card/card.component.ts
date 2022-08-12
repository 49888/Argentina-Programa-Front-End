import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-card',

  template: `
    <div class="row p-2 m-2 position-relative">
      <div class="col-3 Logo">
        <img *ngIf="values?.img" [src]="values?.img" alt="logo">
      </div>
      
      <div class="col-9">
        <h5>{{values?.title}}</h5>
        <p>
          {{values?.description}}
        </p>

        <button class="btn btn-success rounded-circle position-absolute top-0 start-100" *ngIf="(edit$ | async)"><i class="bi bi-pencil fs-6"></i></button>
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

  protected edit$:Observable<boolean> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);
  }

}
