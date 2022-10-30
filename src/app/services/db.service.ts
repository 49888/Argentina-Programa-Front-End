import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';

import { EMPTY, forkJoin, from, Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators'

import { CreateData, Data, DeleteData, ImageDataUpload, UpdateData } from '../models/models';

import { API, END_POINTS, server } from '../helpers/API';
import { data } from '../helpers/data';
import { Store } from '@ngrx/store';
import { error } from '../state/AppActions';


@Injectable({
  providedIn: 'root'
})
export class DB {

  constructor(private http:HttpClient, private store:Store<any>){}


  getData():Observable<any> {

    //?Local data
      return of(data).pipe(delay(1500), catchError((err)=>{

        console.log('ERROR!', err)

        this.store.dispatch( error({error: true, message: err.message}) );

        return EMPTY;
      }));
    //*/

    //*Data from API
      const obs$ = forkJoin({
        banner: this.http.get(END_POINTS.banner.get),
        skills: this.http.get(END_POINTS.skills.get),
        education: this.http.get(END_POINTS.education.get),
        experience: this.http.get(END_POINTS.experience.get),
        projects: this.http.get(END_POINTS.projects.get)
      });
 
      return obs$.pipe( catchError((err)=>{

        console.log('ERROR!', err)

        this.store.dispatch( error({error: true, message: err.message}) );

        return EMPTY;
      }) );
    //*/  
  }



  createData({table, data}:CreateData):Observable<any> {

    let url:string = END_POINTS[table as keyof API].create;

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

    let url:string = END_POINTS[table as keyof API].update;

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

    let url:string = END_POINTS[table as keyof API].delete;

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

    let url:string = END_POINTS[table as keyof API].updateImage + "";


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

    const token = window.sessionStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}