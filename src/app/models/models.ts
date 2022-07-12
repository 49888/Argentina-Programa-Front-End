

interface Banner {
    name:string,
    bannerImg:string | undefined,
    perfilImg:string | undefined,
    info:string,
    title:string
}

interface Skill {
    title:string
    percentage:number
    img:string | undefined
}

interface CardData {
    title:string
    description:string
    img:string | undefined
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

export {Skill, CardData, Banner, Data, DataState}