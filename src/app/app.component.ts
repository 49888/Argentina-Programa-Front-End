import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',

  template: `
  
    <app-header></app-header>

    <router-outlet></router-outlet>
  `,

  styles: [``]
})
export class AppComponent implements OnInit {
  
  title = 'Argentina Programa Proyecto Final';

  protected user:object | null = null; 


  ngOnInit(): void {
    setTimeout(()=> this.user = {name:"majo"}, 3000);
  }

  protected setUser():void {

    this.user = this.user ? null : {name:'majo'};
  }
}
