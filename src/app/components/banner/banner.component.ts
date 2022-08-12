import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Banner, Data } from 'src/app/models/models';
import { selectDataBanner, selectEditState } from 'src/app/state/AppSelectors';



@Component({
  selector: 'app-banner',

  template: `
    <div class="bg-light text-dark rounded">

      <!--Banner-->  
      <div class="banner position-relative">
        <img [src]="(banner$ | async)?.bannerImg" alt="banner">
        
        <button class="btn btn-success rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)"><i class="bi bi-pencil fs-6" (click)="mBannerImage.showModal()"></i></button>
        <!--Update Banner Image-->
        <app-modal [title]=" 'Cambiar Foto de Banner' " #mBannerImage>
          <div class="mb-3">
            <input type="file" class="form-control" name="bannerImg" accept="image/*">
          </div>
        </app-modal>
      </div>
      
      <div class="container-fluid p-2">

        <div class="row align-items-end">

          <!--Perfil image and name-->
          <div class="col-4 p-2 m-2 position-relative" style="top: -50px">
            <div>
              <div class="perfil mx-auto position-relative">
                <img [src]="(banner$ | async)?.perfilImg" alt="perfil">

                <button class="btn btn-success rounded-circle position-absolute top-50 start-50 translate-middle" *ngIf="(edit$ | async)" (click)="mPerfilImage.showModal()"><i class="bi bi-pencil fs-6"></i></button>
                <!--Update Image-->
                <app-modal [title]=" 'Cambiar Foto de Perfil' " #mPerfilImage>
                  <div class="mb-3">
                    <input type="file" class="form-control" name="perfilImg" accept="image/*">
                  </div>
                </app-modal>
              </div>
            </div>
            
            <div class="text-center position-relative">
              <h5>{{ (banner$ | async)?.name }}</h5>

              
              <button class="btn btn-success rounded-circle position-absolute top-0 start-100 translate-middle" *ngIf="(edit$ | async)" (click)="mName.showModal()"><i class="bi bi-pencil fs-6"></i></button>  
              <!--Update Name-->
              <app-modal [title]=" 'Cambiar Nombre' " #mName>
                <div class="mb-3">
                  <input type="text" class="form-control" name="name" placeholder="nombre" [value]="(banner$ | async)?.name">
                </div>
              </app-modal>
            </div>
          </div>

          <!--Title and info-->
          <div class="col p-2 m-2 position-relative">
            <h3>{{ (banner$ | async)?.title}} </h3>
            <p class="m-0">{{ (banner$ | async)?.info }}</p>

            <button class="btn btn-success rounded-circle position-absolute top-0 end-0" *ngIf="(edit$ | async)" (click)="mTitle.showModal()"><i class="bi bi-pencil fs-6"></i></button>
            <!--Update Title and info-->
            <app-modal [title]=" 'Cambiar Titulo o Info' " #mTitle>
              <div class="mb-3">
                <input type="text" class="form-control" name="title" placeholder="Titulo" [value]="(banner$ | async)?.title">
              </div>
              <div class="mb-3">
                <textarea class="form-control" rows="7" name="info" placeholder="Info" [value]="(banner$ | async)?.info"></textarea>
              </div>
            </app-modal>

          </div>
        </div>
      </div>
    </div>
  `,

  styles: [
    `
      img {
        width: 100%;  height: 100%;
        object-fit: cover;
      }
      .banner {
        width: 100%;
        height: 250px;
      }
      .perfil {
        width: 150px;
        height: 150px;
        overflow: hidden;
        border-radius: 50%;
      }
    `
  ]
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
