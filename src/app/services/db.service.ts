import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';

import { forkJoin, from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'

import { CreateData, Data, DeleteData, ImageDataUpload, UpdateData } from '../models/models';

import { END_POINTS } from '../helpers/API';
import { data } from '../helpers/data';


@Injectable({
  providedIn: 'root'
})
export class DB {

  constructor(private http:HttpClient){}


  getData():Observable<any> {

    /*//?Local data
      return of(data).pipe(delay(1500));
    //*/

    //*Data from API
      const obs$ = forkJoin({
        banner: this.http.get(END_POINTS.banner.get),
        skills: this.http.get(END_POINTS.skills.get),
        education: this.http.get(END_POINTS.education.get),
        experience: this.http.get(END_POINTS.experience.get)
      });
 
      return obs$;
    //*/  
  }



  createData({table, data}:CreateData):Observable<any> {

    let url:string = END_POINTS[table as keyof typeof END_POINTS].create;

    console.log('create data: ', {table, url, data});


    //*Peticion a la API
      const obs$ = forkJoin({
        data: this.http.post(url, data, {headers: this.authorization()}),
        table: of(table)
      });

      //obs$.subscribe((value) => console.log(value));

      return obs$;
    //*/
      
    //return of({table, data: 'OK'});
  }



  updateData({id, table, data}:UpdateData):Observable<any> {

    let url:string = END_POINTS[table as keyof typeof END_POINTS].update;

    url = (table !== 'banner' ? url + id : url);


    console.log('update data: ', {table, data, url});


    //*Peticion a la API
      const obs$ = forkJoin({
        data: this.http.put(url, data, {headers: this.authorization()}),
        table: of(table)
      });

      //obs$.subscribe(value => console.log(value))

      return obs$;
    //*/

    //return of({table, data: 'OK'});
  }



  deleteData({id, table}:DeleteData):Observable<any> {

    let url:string = END_POINTS[table as keyof typeof END_POINTS].delete;

    url = (table !== 'banner' ? url + id : url);


    console.log('delete data: ', {table, url});


    //*Petition a la API
      const obs$ = forkJoin({
        data: this.http.delete(url, {headers: this.authorization()}),
        table: of(table)
      });

      return obs$;
    //*/

    //return of({table, data: 'OK'});
  }


  
  updateImage({table, data}:ImageDataUpload):Observable<any> {

    let url:string = END_POINTS[table as keyof typeof END_POINTS].updateImage;


    console.log('update image: ', {table, url, data});


    //Mostrar el Form
    Array(...data.entries()).forEach( item => console.log('update image form: ', item) );


    //*Peticion a la API
      const obs$ = forkJoin({
        data: this.http.post(url, data, {headers: this.authorization()}),
        table: of(table)
      });

      //obs$.subscribe((value) => console.log(value));

      return obs$;
    //*/  

    //return of({table, data: 'OK'});
  }


  private authorization():HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}