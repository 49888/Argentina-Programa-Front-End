import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/models';
import { selectDataProjects, selectEditState } from 'src/app/state/AppSelectors';

@Component({
  selector: 'app-projects',
  template: `
    <div>
      <h4 class="border-bottom border-light p-2">Proyectos</h4>
      <div class="container-fluid">
        
        <app-card-project *ngFor="let item of (projects$ | async); index as i;" [value]="item" table="projects"></app-card-project>

      </div>

      <div *ngIf="(edit$ | async)" class="position-relative" style="height: 50px;">
        <!-- create buttom-->
        <button class="btn btn-success position-absolute bottom-0 end-0" (click)="createModal.showModal()">Add</button>

        <!-- create modal -->
        <app-modal-create title="Agregar" [table]="table" #createModal>
          <div class="mb-3">
            <input type="text" class="form-control" name="name" placeholder="Nombre">
          </div>
          <div class="mb-3">
            <textarea class="form-control" rows="3" name="description" placeholder="Descripcion"></textarea>
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" rows="3" name="github" placeholder="Repositorio de Github">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" rows="3" name="ghPages" placeholder="Web">
          </div>
        </app-modal-create>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ProjectsComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  protected projects$:Observable<Project[] | undefined> = new Observable();

  table:string = "projects";

  constructor(private store:Store<any>){}

  ngOnInit():void {

    this.projects$ = this.store.select(selectDataProjects);

    this.edit$ = this.store.select(selectEditState);
  }

}
