import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { create, resetError } from 'src/app/state/AppActions';
import { selectDataState, selectError } from 'src/app/state/AppSelectors';

@Component({
  selector: 'app-modal-create-chart',

  template: `
    <ng-container *ngIf="show">

      <div class="Modal" (mousedown)="closeWithClick($event)" #modalBack>

        <div class="Modal-content rounded bg-light p-2 w-50">

          <div class="alert alert-danger" role="alert" *ngIf="(error$ | async)?.error">
            <h4 class="alert-heading">Ocurrio un Error</h4>
            <hr>
            <p class="mb-0">{{(error$ | async)?.message}}</p>
          </div>
          
          <div>
            <h3 class="text-dark">{{title}}</h3>
          </div>

          <form (ngSubmit)="onSubmit($event)">

            <ng-content></ng-content>

            <button type="submit" class="btn btn-success mx-1">Create</button>
            <button type="button" class="btn btn-danger mx-1" (click)="hideModal()">Cancel</button>
          </form>

        </div>

      </div>

      </ng-container>
  `,
  
  styles: [
    `
      .Modal {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        z-index: 10000;
      }
    `
  ]
})
export class ModalCreateChartComponent implements OnInit {

  @Input() title:string = '';

  @Input() table:string = '';

  
  protected error$:Observable<any> = new Observable();


  @ViewChild('modalBack') modalBack:ElementRef | null = null; 

  public show:boolean = false;

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.error$ = this.store.select(selectError);

    this.store.select(selectDataState).subscribe(() => {

      this.hideModal();
    })
  }

  showModal(){
    this.show = true;
  }

  hideModal(){
    this.show = false;

    this.store.dispatch(resetError());
  }

  onSubmit(e:any){

    const formdata = new FormData(e.target);

    let data:any = {};

    for (const item of formdata.entries()) {
      
      data = {...data, [item[0]]: item[1]};
    }

    //console.log('Modal-chart-create form data: ', data);

    let aux = {
      table: this.table,
      data,
    }

    this.store.dispatch(create( {createData: aux} ));
  }

  closeWithClick(e:any){

    if(e.target === this.modalBack?.nativeElement) this.hideModal();
  }
}
