import {createAction, props} from '@ngrx/store';
import { CreateData, Data, DeleteData, ImageDataUpload, UpdateData } from '../models/models';


const load = createAction('[main] load data');

const loaded = createAction('[main] loaded success', props<{data:Data}>());

const edit = createAction('[main] Edit mode enable');


const update = createAction('[modal] update database', props<{updateData:UpdateData}>());

const updated = createAction('[modal] updated database', props<{table:string, data:any}>());

const deleteAction = createAction('[delete modal] delete item from database', props<{deleteData:DeleteData}>());

const deletedAction = createAction('[delete modal] deleted item from database', props<{table:string, data:any}>());


const create = createAction('[create modal] add item from database', props<{createData:CreateData}>());

const created = createAction('[create modal] item added to database', props<{table:string, data:any}>());


const updateImageAction = createAction('[modal crop] update image from database', props<{imageDataUpload:ImageDataUpload}>());

const updatedImageAction = createAction('[modal crop] updated image from database', props<{table:string, data:any}>());

export {load, loaded, edit, update, updated, deleteAction, deletedAction, create, created, updateImageAction, updatedImageAction};


export const error = createAction('[DB Service] Error', props<{error:boolean, message: string}>());

export const resetError = createAction('[DB Service] clear error');