import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from 'src/app/helpers/API';
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
            <ul class="Redes d-flex my-0 mx-2" style="list-style: none;">
              <li>
                <a href="mailto:murillofausto619@gmail.com?subject=Vi%20tu%20Portfolio" target="_blank" rel="noopener noreferrer"><i class="bi bi-google"></i></a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send?phone=5493816065882" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/franco-javier-alvarez-301105230/" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
              </li>
              <li>
                <a href="https://github.com/49888" target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i></a>
              </li>
            </ul>


            <button class="btn btn-success my-0 mx-2" *ngIf="!(edit$ | async)" (click)="this.login()">Login</button>

            <button type="button" class="btn btn-danger my-0 mx-2" *ngIf="(edit$ | async)" (click)="this.salir()">Salir</button>
          </div>
        </div>
      </nav>
    </header>
  `,

  styles: [
    `
      header {
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .Redes li a {
        padding: 7px;
      }
      .Redes .bi {
        font-size: 25px;
        color: white;
      }
      .Redes .bi:hover {
        color: #0e64e6;
        text-shadow: 0px 0px 4px rgba(128,65,228,0.75);
      }
    `
  ]
})
export class HeaderComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();

  constructor(private http:HttpClient, private router:Router, private store:Store<any>){}

  ngOnInit(): void {

    this.edit$ = this.store.select(selectEditState);
  }

  salir(){

    this.store.dispatch(edit());
  }

  login(){

    const token = window.sessionStorage.getItem('token');

    if(!token){

      this.router.navigate(['/session']);

      return;
    }

    const obs$ = this.http.get(login.info, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

    obs$.subscribe({

      next: (response:any) => {

        console.log("Bienvenido: ", response?.name);
        this.store.dispatch(edit());
      },

      error: (error) => {

        this.router.navigate(['/session']);
      }
    });
  }

}
