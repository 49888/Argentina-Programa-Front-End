
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

export const server:string = "https://argentina-programa-backend-992.herokuapp.com";

export const END_POINTS:API = {

  banner: {
    get: server + "/api/banner/get",
    update: server + "/api/banner/update",
    delete: server + '/api/banner/delete',
    create: server + '/api/banner/create',
    updateImage: server + '/api/banner/images/update'
  },

  skills: {
    get: server + "/api/skills/get",
    create: server + "/api/skills/create",
    update: server + "/api/skills/update/",
    delete: server + "/api/skills/delete/",
    updateImage: server + '/api/skills/images/update' 
  },

  education: {
    get: server + "/api/education/get",
    create: server + "/api/education/create",
    update: server + "/api/education/update/",
    delete: server + "/api/education/delete/",
    updateImage: server + '/api/education/images/update' 
  },
  
  experience: {
    get: server + "/api/experience/get",
    create: server + "/api/experience/create",
    update: server + "/api/experience/update/",
    delete: server + "/api/experience/delete/",
    updateImage: server + '/api/experience/images/update' 
  },

  projects: {
    get: server + "/api/projects/get",
    create: server + "/api/projects/create",
    update: server + "/api/projects/update/",
    delete: server + "/api/projects/delete/"
  }
}



//export const server:string = "";


export const login = {
  token: server + '/login',
  info: server + '/api/auth/info'
}
  