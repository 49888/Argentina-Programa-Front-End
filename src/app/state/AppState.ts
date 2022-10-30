import { ActionReducerMap } from "@ngrx/store";
import { DataState } from "../models/models";
import { EditReducer, ErrorReducer, loadingReducer } from "./AppReducers";

interface Error {
    error:boolean,
    message:string
}

interface AppState {

    Edit:boolean,
    Data:DataState,
    Error:Error 
}

const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    Edit: EditReducer,
    Data: loadingReducer,
    Error: ErrorReducer
}

export {AppState, ROOT_REDUCERS}