

interface Banner {
    id:number,
    name:string | null,
    bannerImg:string | null,
    perfilImg:string | null,
    information:string | null,
    title:string | null
}

interface Skill {
    id:number
    title:string | null
    percentage:number | null 
    img:string | null
}

interface CardData {
    id:number
    title:string | null
    description:string | null
    img:string | null
}


interface Data {
    banner:Banner
    education:CardData[]
    experience:CardData[]
    skills:Skill[]
}

interface DataState {
    loading:boolean
    data:Data | null
}

interface UpdateData {
    id:number,
    table:string,
    data:any
}

interface DeleteData {
    id:number,
    table:string
}

interface CreateData {
    table:string,
    data: any
}


interface ImageDataUpload {
    table:string,
    data:FormData,
    id?:number
    to?:string //banner or perfil
}

export {Skill, CardData, Banner, Data, DataState, UpdateData, DeleteData, ImageDataUpload, CreateData}