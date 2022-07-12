import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-card',

  template: `
    <div class="row p-2">
      <div class="col-3 Logo">
        <img *ngIf="values?.img" [src]="values?.img" alt="logo">
      </div>
      
      <div class="col-9">
        <h5>{{values?.title}}</h5>
        <p>
          {{values?.description}}
        </p>
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

  constructor() { }

  ngOnInit(): void {
  }

}
