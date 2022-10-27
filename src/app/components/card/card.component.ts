import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEditState } from 'src/app/state/AppSelectors';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-card',

  template: `
    <div class="row p-2 m-2 position-relative">
      
      <div class="col-3">
        <app-card-image [image]="values?.img" [id]="values?.id" [table]="table"></app-card-image>
      </div>
      
      <div class="col-9"> 
        <app-card-title-description [title]="values?.title" [description]="values?.description" [id]="values?.id" [table]="table"></app-card-title-description>
      </div>
    </div>
  `,

  styles: [``]
})
export class CardComponent implements OnInit {

  @Input() values:CardData | null = null;

  @Input() table:string | undefined = '';

  protected edit$:Observable<boolean> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);
  }

}
