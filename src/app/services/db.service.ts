import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { forkJoin, from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'
import { Data, DeleteData, UpdateData } from '../models/models';

export const END_POINTS = {

  banner: {
    get: "api/banner/get",
    update: "api/banner/update",
    delete: 'api/banner/delete',
    create: 'api/banner/create'
  },
  skills: {
    get: "api/skills/get",
    create: "api/skills/create",
    update: "api/skills/update/",
    delete: "api/skills/delete/" 
  },
  education: {
    get: "api/education/get",
    create: "api/education/create",
    update: "api/education/update/",
    delete: "api/education/delete/" 
  },
  experience: {
    get: "api/experience/get",
    create: "api/experience/create",
    update: "api/experience/update/",
    delete: "api/experience/delete/" 
  } 
}

@Injectable({
  providedIn: 'root'
})
export class DB {


  constructor(private http:HttpClient){}

  getData(): Observable<any> {

    /*//
      const data:Data = {
          banner: {
            id: 1,
            name: 'Franco Javier Gadea',
            bannerImg: 'assets/image/banner.jpg',
            perfilImg: 'assets/image/perfil.png',
            information: 'La producción de "Komi-san wa, Komyushou Desu" abrió una campaña especial para el Blu-ray BOX de la primera temporada. Si se superan 300 reservaciones, el paquete será lanzado y si, por ejemplo, se superan 2,000, se añadirán las medias de Komi como beneficio',
            title: 'Desarrollador Full Stack'
          },
          experience: [
            {
              id: 1,
              title: 'Repartidor de Rappi',
              description: 'Fui repartidor durante el año 2022',
              img: 'assets/image/rappi.webp'
            }
          ],
          education: [
            {
              id: 1,
              title: 'Colegio Nacional',
              description: 'Secuandario completo',
              img: 'assets/image/colegio.png'
            },
            {
              id: 2,
              title: 'Universidad Tecnologica Nacional',
              description: 'Cursando Ingenieria en Sistemas de Informacion',
              img: 'assets/image/utn.png'
            }
          ],
          skills: [
            {
              id: 1,
              title: 'JavaScript',
              percentage: 70,
              img: 'assets/image/javascript.png'
            },
            {
              id: 2,
              title: 'React',
              percentage: 40,
              img: 'assets/image/react.png'
            },
            {
              id: 3,
              title: 'Angular',
              percentage: 30,
              img: 'assets/image/angular.png'
            },
            {
              id: 4,
              title: 'Java',
              percentage: 60,
              img: 'assets/image/java.png'
            }
          ]
      }
      return of(data).pipe(delay(1500));
    //*/


    const obs$ = forkJoin({
      banner: this.http.get(END_POINTS.banner.get),
      skills: this.http.get(END_POINTS.skills.get),
      education: this.http.get(END_POINTS.education.get),
      experience: this.http.get(END_POINTS.experience.get)
    });
 
    return obs$;
  }


  updateData({id, table, data}:UpdateData): Observable<any> {

    let url:string = END_POINTS[table as keyof typeof END_POINTS].update;

    url = (table !== 'banner' ? url + id : url);


    console.log({table, data, url});


    const obs$ = forkJoin({
      data: this.http.put(url, data),
      table: of(table)
    });

    obs$.subscribe(value => console.log(value))

    //return of({status: "OK"});
    return obs$;
  }

  deleteData({id, table}:DeleteData){

    let url:string = END_POINTS[table as keyof typeof END_POINTS].delete;

    url = (table !== 'banner' ? url + id : url);

    console.log({table, url});

    const obs$ = forkJoin({
      data: this.http.delete(url),
      table: of(table)
    });

    return obs$;
  }
}