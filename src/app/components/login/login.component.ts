import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login, server } from 'src/app/helpers/API';
import { AccessTokenResponse } from 'src/app/models/models';
import { edit } from 'src/app/state/AppActions';

@Component({
  selector: 'app-login',
  template: `
     

    <app-login-bg>
      
      <div class="alert alert-danger my-2" role="alert" *ngIf="error">
        {{reason}}
      </div>

      <form class="bg-light p-4 mx-auto rounded" (submit)="submit($event)">
        <div class="mb-3 p-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" name="email">
        </div>

        <div class="mb-3 p-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password">
        </div>

        <div class="p-3 d-flex justify-content-center">

          <button type="submit" class="btn btn-primary mx-5 px-5" [class.disabled]="waiting">Login</button>
  
          <button type="reset" class="btn btn-danger mx-5 px-5" [class.disabled]="waiting">Reset</button>

        </div>
      </form>
      
     </app-login-bg>
  `,
  styles: [

    `
      .disabled {
        pointer-events: none;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  error:boolean = false;

  reason:string = '';

  waiting:boolean = false;

  constructor(private http:HttpClient, private router:Router, private store:Store){}

  ngOnInit(): void {
  }

  submit(e:any){

    this.waiting = true;

    const form = e.target;

    const data = new FormData(e.target);

    
    const credentials = {
      email: data.get('email'),
      password: data.get('password')
    }

    
    const obs$ = this.http.post(login.token, credentials);

    obs$.subscribe({

      next: (response:any) => {

        this.waiting = false;
    
        console.log(response);
    
        window.sessionStorage.setItem('token', (<AccessTokenResponse> response).access_token);
    
        if((<AccessTokenResponse> response).access_token && window.sessionStorage.getItem('token')){
    
          this.store.dispatch(edit());
          this.router.navigate(['/']);
        }
        
      },
      
      error: (error:HttpErrorResponse) => {

        this.waiting = false;

        this.error = true;
    
        if(error.status === 401) {
          this.reason = "Email or Password incorrect"
        }
      }
    });
  
  }

  validate(){

    const token = localStorage.getItem('token');

    const obs$ = this.http.get(login.info, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });

    obs$.subscribe(value => console.log(value));
  }

  activate(){
    this.store.dispatch(edit());
    this.router.navigate(['/']);
  }

}
