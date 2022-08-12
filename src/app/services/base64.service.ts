import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor(){}

  public getBase64 = async (file:File) => {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {

        resolve({
          base64: e.target?.result
        });
      }

      reader.onerror = (e) => {

        reject({
          base64: null
        })
      }
    });
  }
}
