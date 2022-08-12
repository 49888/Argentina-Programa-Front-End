import { createReducer, on } from "@ngrx/store";
import { Data, DataState } from "../models/models";
import { edit, load, loaded } from "./AppActions";

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
    })
);



const EditReducer = createReducer(true, 
    on(edit, (state) => {

        return !state;
    })    
);

export {loadingReducer, EditReducer}

