import { createSelector } from "@ngrx/store";
import { DataState } from "../models/models";
import { AppState } from "./AppState";

export const selectDataState = (state:AppState) => {

    return state.Data;
};


export const selectEditState = (state:AppState) => {

    return state.Edit;
};


export const selectData = createSelector(selectDataState, (state:DataState) => {

    return state.data;
});

export const selectLoading = createSelector(selectDataState, (state:DataState) => {

    return state.loading;
});


export const selectDataBanner = createSelector(selectDataState, (state:DataState) => {

    return state.data?.banner;
});

export const selectDataExperience = createSelector(selectDataState, (state:DataState) => {

    return state.data?.experience;
});

export const selectDataEducation = createSelector(selectDataState, (state:DataState) => {

    return state.data?.education;
});

export const selectDataSkills = createSelector(selectDataState, (state:DataState) => {

    return state.data?.skills;
});





