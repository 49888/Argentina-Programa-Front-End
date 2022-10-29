import { Data } from "../models/models";


export const data:Data = {

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
  ],

  projects: []
}