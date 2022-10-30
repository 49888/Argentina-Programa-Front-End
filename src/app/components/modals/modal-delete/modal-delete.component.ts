import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteAction } from 'src/app/state/AppActions';
import { selectDataState } from 'src/app/state/AppSelectors';

@Component({
  selector: 'app-modal-delete',
  template: `
    <ng-container *ngIf="show">

      <div class="Modal" (mousedown)="closeWithClick($event)" #modalBack>

        <div class="Modal-content rounded bg-light p-2 w-25">
          
          <div>
            <h3 class="text-dark text-center">{{title}}</h3>
          </div>

          <form (ngSubmit)="onSubmit($event)" class="mx-auto" style="width: fit-content;">

            <ng-content></ng-content>

            <button type="submit" class="btn btn-danger mx-1">Delete</button>
            <button type="button" class="btn btn-success mx-1" (click)="hideModal()">Cancel</button>
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
export class ModalDeleteComponent implements OnInit {

  @Input() title:string = '';

  @Input() table:string = '';

  @ViewChild('modalBack') modalBack:ElementRef | null = null; 

  public show:boolean = false;

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.store.select(selectDataState).subscribe(() => {

      this.hideModal();
    })
  }

  showModal(){
    this.show = true;
  }

  hideModal(){
    this.show = false;
  }

  onSubmit(e:any){

    const formdata = new FormData(e.target);

    let data:any = {};

    for (const item of formdata.entries()) {
      
      data = {...data, [item[0]]: item[1]};
    }

    

    //
    let aux = {
      table: this.table,
      id: data['id' as keyof typeof data]
    }

    console.log('Delete Modal: ', aux);

    this.store.dispatch(deleteAction( {deleteData: aux} ));
    //*/
  }

  closeWithClick(e:any){

    if(e.target === this.modalBack?.nativeElement) this.hideModal();
  }

}
