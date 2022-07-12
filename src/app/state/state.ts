import { ActionReducerMap } from "@ngrx/store";
import { DataState } from "../models/models";
import { loadingReducer } from "./reducers";

interface AppState {

    Data:DataState
}

const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    Data: loadingReducer
}

export {AppState, ROOT_REDUCERS}