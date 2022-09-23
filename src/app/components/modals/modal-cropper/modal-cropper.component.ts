import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CropperComponent } from 'angular-cropperjs';
import { ImageDataUpload } from 'src/app/models/models';
import { Base64Service } from 'src/app/services/base64.service';
import { updateImageAction } from 'src/app/state/AppActions';

@Component({
  selector: 'app-modal-cropper',
  template: `
    <ng-container *ngIf="show">
      
      <div class="Modal" (mousedown)="closeWithClick($event)" #modalBack>
        <div class="Modal-content rounded bg-light p-2 w-75">
          
          <div class="text-dark">
            <h3>{{title}}</h3>
          </div>

          <form (ngSubmit)="onSubmit($event)" *ngIf="!imageCropper">

            <div class="mb-3">
              <input type="file" class="form-control" name="image" accept="image/*">
            </div>

            <button type="submit" class="btn btn-success mx-1">Cargar imagen</button>

            <button type="button" class="btn btn-danger mx-1" (click)="hideModal()">Cancel</button>
          </form>

          <div *ngIf="imageCropper && showCropper">
            <angular-cropper [cropperOptions]="config" [imageUrl]="imageCropper" #cropper class="{{type === 'circle' ? 'circle-cropper' : ''}}"></angular-cropper>
            <button class="btn btn-primary m-1" (click)="cortar()">Cortar</button>

            <button type="button" class="btn btn-danger m-1" (click)="hideModal()">Cancel</button>
          </div>

          <div class="img" *ngIf="imageURL" class="{{type === 'circle' ? 'circle-img' : ''}}">
            <img [src]="imageURL">
          </div>

          <div *ngIf="imageBlob">
            <button class="btn btn-success m-1" (click)="subirImagen()">Cambiar Imagen</button>

            <button type="button" class="btn btn-danger m-1" (click)="hideModal()">Cancel</button>
          </div>
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

      .img {
        height: 400px;

        margin: auto;
      }
      .img img {
        width: 100%; height: 100%;
        object-fit: cover;
      }
      .circle-img {
        width: 400px; height: 400px;
        margin: auto;
      }
      .circle-img img {
        border-radius: 50%;
        border: 1px solid lightgray;
        box-shadow: 3px 3px 19px 4px lightgray;
      }
    `
  ]
})
export class ModalCropperComponent implements OnInit {

  @Input() title:string = '';

  @Input() type:string = '';

  protected show:boolean = false;

  @ViewChild('modalBack') modalBack:ElementRef | null = null; 


  //
  @Input() table:string | null = null;

  @Input() imageId:number | null = null;

  @Input() to:string | null = null;
 

  //Image
    protected imageName:string | null = null;

    protected imageURL:string | null = null;

    protected imageBlob:Blob | null = null;
  //*/

  //Cropper
    protected config:any = {
      guides: false,
      center: false,
      aspectRatio: NaN
    }

    @ViewChild('cropper') cropper:CropperComponent | null = null; 

    protected imageCropper:string | null = null; 

    protected showCropper:boolean = false;
  //*/

  constructor(private read:Base64Service, private store:Store){}

  ngOnInit(): void {

    switch(true){

      case this.type === 'circle':
        this.config.aspectRatio = 1;
        break;

      case this.type === 'square':
        this.config.aspectRatio = 1;
        break; 

      case this.type === 'rectangle':
        this.config.aspectRatio = 16/9;
        break;
        
      case this.type === 'none':
        this.config.aspectRatio = NaN;
        break;  
    }
  }

  showModal(){
    this.show = true;
  }

  hideModal(){
    this.show = false;
  }

  closeWithClick(e:any){

    if(e.target === this.modalBack?.nativeElement){
      
      this.imageName = null;
      this.imageURL = null;
      this.imageBlob = null;

      this.imageCropper = null;
      this.showCropper = false;

      this.hideModal();
    } 
  }

  protected onSubmit(e:any){

    const formData:FormData = new FormData(e.target);

    const file:File | null = formData.get('image') as File;
    
    console.log(file);

    if(file.size !== 0){
      this.imageName = file.name;

      this.read.getBase64(file).then((value:any) => {

        this.imageCropper = value.base64;

        this.showCropper = true;
      });
    }
  }

  protected cortar(){

    //Obtener la imagen recortada en base64 para previsualizar
    this.imageURL = this.cropper?.cropper.getCroppedCanvas({}).toDataURL() as string;

    //console.log('url:', this.imageURL);

    //Obtener la imagen recortada como Blob para subir al servidor
    this.cropper?.cropper.getCroppedCanvas({width: 300, height: 300}).toBlob((blob) => {

      this.imageBlob = blob;
    });


    this.showCropper = false;
  }

  protected subirImagen(){

    console.log('subiendo...');

    if(this.imageBlob && this.imageName){

      let formdata:FormData = new FormData();

      formdata.append('file', new File([this.imageBlob], this.imageName))


      const aux:ImageDataUpload = {
        table: this.table as string,
        data: formdata      
      }

      if(this.imageId){


        aux.id = this.imageId;

        aux.data.append('id', this.imageId.toString());
      } 

      if(this.to){
        aux.to = this.to;

        aux.data.append('to', this.to);
      } 

      

      this.store.dispatch(updateImageAction({imageDataUpload: aux}));
    }
  }
}
