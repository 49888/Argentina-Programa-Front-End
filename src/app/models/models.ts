

export interface Banner {
    id:number,
    name:string | null,
    bannerImg:string | null,
    perfilImg:string | null,
    information:string | null,
    title:string | null
}

export interface Skill {
    id:number
    title:string | null
    percentage:number | null 
    img:string | null
}

export interface CardData {
    id:number
    title:string | null
    description:string | null
    img:string | null
}

export interface Project {
    id:number
    name:string | null,
    description:string | null
    github:string | null,
    ghPages:string | null
}


export interface Data {
    banner:Banner
    education:CardData[]
    experience:CardData[]
    skills:Skill[],
    projects:Project[]
}

export interface DataState {
    loading:boolean
    data:Data | null
}

export interface UpdateData {
    id:number,
    table:string,
    data:any
}

export interface DeleteData {
    id:number,
    table:string
}

export interface CreateData {
    table:string,
    data: any
}


export interface ImageDataUpload {
    table:string,
    data:FormData,
    id?:number
    to?:string //banner or perfil
}

export interface AccessTokenResponse {
    access_token:string 
    client_id:string 
    expires_in:string  
    issued_at:string  
    issuer:string  
    token_type:string 
}

