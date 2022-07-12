import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../models/models';



@Component({
  selector: 'app-education',

  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Educacion</h4>
      <div class="container-fluid">
        
          <app-card *ngFor="let item of data; index as i;" [values]="item"></app-card>
          

      </div>
    </div>
  `,

  styles: []
})
export class EducationComponent implements OnInit {

  @Input() data:CardData[] | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
