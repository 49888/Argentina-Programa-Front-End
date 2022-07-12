import { createSelector } from "@ngrx/store";
import { DataState } from "../models/models";
import { AppState } from "./state";

const selectDataState = (state:AppState) => {

    return state.Data;
};

const selectData = createSelector(selectDataState, (state:DataState) => {

    return state.data;
});

const selectLoading = createSelector(selectDataState, (state:DataState) => {

    return state.loading;
});


export {selectData, selectDataState, selectLoading}
