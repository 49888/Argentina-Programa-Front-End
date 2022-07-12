import { createReducer, on } from "@ngrx/store";
import { Data, DataState } from "../models/models";
import { load, loaded } from "./actions";

const initialState:DataState = {
    loading: false,
    data: null
};

//Escucha las diferenctes acciones
const loadingReducer = createReducer(initialState,
    on(load, (state) => {

        return {...state, loading: true }
    }),
    on(loaded, (state, data) => {

        return {...state, data: data, loading: false}
    })
);

export {loadingReducer}