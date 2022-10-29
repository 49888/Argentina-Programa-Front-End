
export interface END_POINT {
  get:string,
  update:string,
  delete:string,
  create:string,
  updateImage?:string
}


export interface API {
  banner:END_POINT,
  skills:END_POINT,
  education:END_POINT,
  experience:END_POINT,
  projects:END_POINT
}

export const END_POINTS:API = {

  banner: {
    get: "/api/banner/get",
    update: "/api/banner/update",
    delete: '/api/banner/delete',
    create: '/api/banner/create',
    updateImage: '/api/banner/images/update'
  },

  skills: {
    get: "/api/skills/get",
    create: "/api/skills/create",
    update: "/api/skills/update/",
    delete: "/api/skills/delete/",
    updateImage: '/api/skills/images/update' 
  },

  education: {
    get: "/api/education/get",
    create: "/api/education/create",
    update: "/api/education/update/",
    delete: "/api/education/delete/",
    updateImage: '/api/education/images/update' 
  },
  
  experience: {
    get: "/api/experience/get",
    create: "/api/experience/create",
    update: "/api/experience/update/",
    delete: "/api/experience/delete/",
    updateImage: '/api/experience/images/update' 
  },

  projects: {
    get: "/api/projects/get",
    create: "/api/projects/create",
    update: "/api/projects/update/",
    delete: "/api/projects/delete/"
  }
}

export const server:string = "https://argentina-programa-backend-992.herokuapp.com";

//export const server:string = "";


export const login = {
  token: '/login',
  info: '/api/auth/info'
}
  