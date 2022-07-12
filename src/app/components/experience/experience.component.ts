import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../models/models';


@Component({
  selector: 'app-experience',
  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Experiencia</h4>
      <div class="container-fluid">
        
        <app-card *ngFor="let item of data; index as i;" [values]="item"></app-card>

      </div>
    </div>
  `,
  styles: [
  ]
})
export class ExperienceComponent implements OnInit {

  @Input() data:CardData[] | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
