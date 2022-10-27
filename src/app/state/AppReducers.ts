import { createReducer, on } from "@ngrx/store";
import { Banner, CardData, Data, DataState, Skill } from "../models/models";
import { created, deletedAction, edit, load, loaded, updated, updatedImageAction } from "./AppActions";

const initialState:DataState = {
    loading: false,
    data: null
};

//Escucha las diferenctes acciones
const loadingReducer = createReducer(initialState,
    on(load, (state) => {

        return {...state, loading: true }
    }),
    on(loaded, (state, {data}) => {

        console.log(data);

        return {...state, data: data, loading: false}
    }),
    on(updated, (state, {table, data}) => {

        let aux = {...state.data};

        

        if(table === 'banner'){
           
            aux = {...aux, banner: data};
        }
        else {

            let array = (aux[table as keyof typeof aux] as CardData[] | Skill[])?.map(item => item.id == data.id ? data : item);

            aux[table as keyof typeof aux] = array as CardData[] & Skill[] & Banner;
        }

        return {...state, data: aux as Data}
    }),

    on(deletedAction, (state, {table, data}) => {

        let aux = {...state.data};

        if(table === 'banner'){
           
            aux = {...aux, banner: data};
        }
        else {

            let array = (aux[table as keyof typeof aux] as CardData[] & Skill[])?.filter(item => item.id !== data.id);

            aux[table as keyof typeof aux] = array as CardData[] & Skill[] & Banner;
        }

        return {...state, data: aux as Data};
    }),

    on(created, (state, {table, data}) => {

        let aux = {...state.data};

        if(table !== 'banner'){

            let array = [...(aux[table as keyof typeof aux] as CardData[] & Skill[]), data];


            aux[table as keyof typeof aux] = array as CardData[] & Skill[] & Banner;
        }
        

        return {...state, data: aux as Data}
    }),

    on(updatedImageAction, (state, {table, data}) => {

        let aux = {...state.data};

        if(table === 'banner'){
           
            aux = {...aux, banner: data};
        }
        else {

            let array = (aux[table as keyof typeof aux] as CardData[] & Skill[])?.map(item => item.id == data.id ? data : item);

            aux[table as keyof typeof aux] = array as CardData[] & Skill[] & Banner;
        }

        return {...state, data: aux as Data};
    })
);



const EditReducer = createReducer(false, 
    on(edit, (state) => {

        return !state;
    })    
);

export {loadingReducer, EditReducer}

