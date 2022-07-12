import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'
import { Data } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DB {


  constructor() { }

  getData(): Observable<any> {

    //TODO: Aqui podemos hacer http.get('api...')
    const data:Data = {

        banner: {
            name: 'Franco Javier Gadea',
            bannerImg: 'assets/image/banner.jpg',
            perfilImg: 'assets/image/perfil.png',
            info: 'lorem',
            title: 'Desarrollador Full Stack'
        },

        experience: [
            {
            title: 'Repartidor de Rappi',
            description: 'Fui repartidor durante el año 2022',
            img: 'assets/image/rappi.webp'
            }
        ],

        education: [
            {
            title: 'Colegio Nacional',
            description: 'Secuandario completo',
            img: 'assets/image/colegio.png'
            },
            {
            title: 'Universidad Tecnologica Nacional',
            description: 'Cursando Ingenieria en Sistemas de Informacion',
            img: 'assets/image/utn.png'
            }
        ],

        skills: [
            {
            title: 'JavaScript',
            percentage: 70,
            img: 'assets/image/javascript.png'
            },
            {
            title: 'React',
            percentage: 40,
            img: 'assets/image/react.png'
            },
            {
            title: 'Angular',
            percentage: 30,
            img: 'assets/image/angular.png'
            },
            {
            title: 'Java',
            percentage: 60,
            img: 'assets/image/java.png'
            }
        ]
    }

    return of(data).pipe(delay(1500))
  }

}