import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { edit } from 'src/app/state/AppActions';
import { selectEditState } from 'src/app/state/AppSelectors';

@Component({
  selector: 'app-header',

  template: `
    <header class="bg-dark">
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="assets/image/logo.png" alt="" height="70" class="d-inline-block align-text-center">
            #YoProgramo
          </a>

          <div class="d-flex align-items-center">
            <ul class="d-flex my-0 mx-2">
              <li>
                <a href="mailto:murillofausto619@gmail.com?subject=Vi%20tu%20Portfolio" target="_blank" rel="noopener noreferrer"><i class="bi bi-google"></i></a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send?phone=5493816065882" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i></a>
              </li>
            </ul>

            <a class="btn btn-success my-0 mx-2" *ngIf="!(edit$ | async)" routerLink="/login">Login</a>

            <button type="button" class="btn btn-danger my-0 mx-2" *ngIf="true" (click)="this.enableEdit()">Salir</button>
          </div>
        </div>
      </nav>
    </header>
  `,

  styles: [
    `
      ul li a {
        padding: 7px;
        font-size: 16pt;
        color: white;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  constructor(private store:Store<any>){}

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);
  }

  enableEdit(){

    console.log("Edit mode");

    this.store.dispatch(edit());
  }

}
