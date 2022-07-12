import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Banner } from 'src/app/models/models';



@Component({
  selector: 'app-banner',

  template: `
    <div class="bg-light text-dark rounded">
      <div class="banner">
        <img [src]="data?.bannerImg" alt="banner" >    
      </div>
      
      <div class="container-fluid p-2" style="margin-top: -75px;">

        <div class="row align-items-end">

          <div class="col-4 p-2">

            <div>
              <div class="perfil mx-auto">
                <img [src]="data?.perfilImg" alt="perfil">
              </div>
            </div>
            
            <div class="text-center">
              <h5>{{ data?.name }}</h5>
            </div>
          </div>

          <div class="col p-2">
            <p class="m-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam, cupiditate id, ipsa ipsam enim atque fugit a, eligendi inventore quod! Sequi quaerat sit fugiat velit officiis alias corrupti odit!
            </p>
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
export class BannerComponent implements OnInit, OnChanges {

  @Input() edit:boolean = false;
  @Input() data:Banner | undefined = undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.edit);
  }

  ngOnInit(): void {

    
  }

}
