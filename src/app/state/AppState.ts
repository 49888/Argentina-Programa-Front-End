import { ActionReducerMap } from "@ngrx/store";
import { DataState } from "../models/models";
import { EditReducer, loadingReducer } from "./AppReducers";

interface AppState {

    Edit:boolean,
    Data:DataState
}

const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    Edit: EditReducer,
    Data: loadingReducer
}

export {AppState, ROOT_REDUCERS}