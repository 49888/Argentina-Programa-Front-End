import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Banner, Data } from 'src/app/models/models';
import { selectDataBanner, selectEditState } from 'src/app/state/AppSelectors';



@Component({
  selector: 'app-banner',

  template: `
    <div class="bg-light text-dark rounded">

      <!--Banner Image-->
      <app-banner-image [image]="(banner$ | async)?.bannerImg"></app-banner-image>
      
      <div class="container-fluid p-2">

        <div class="row align-items-start">

          <div class="col-5 p-2 m-2">
            
            <!--Banner Perfil-->
            <app-banner-perfil [image]="(banner$ | async)?.perfilImg" [name]="(banner$ | async)?.name"></app-banner-perfil>

            <!--Banner Redes-->
            <app-banner-redes color="black"></app-banner-redes>

          </div>

          <div class="col p-2 m-2 position-relative">

            <!--Banner Title and Info-->
            <app-banner-title-info [title]="(banner$ | async)?.title" [info]="(banner$ | async)?.information"></app-banner-title-info>
          
          </div>

        </div>
      </div>
    </div>
  `,

  styles: [``]
})
export class BannerComponent implements OnInit {

  protected edit$:Observable<boolean> = new Observable();


  protected banner$:Observable<Banner | undefined> = new Observable();

  constructor(private store:Store<any>){}

  

  ngOnInit():void {

    this.banner$ = this.store.select(selectDataBanner);

    this.edit$ = this.store.select(selectEditState);
  }

}
