import {createAction, props} from '@ngrx/store';
import { Data, DeleteData, UpdateData } from '../models/models';


const load = createAction('[main] load data');

const loaded = createAction('[main] loaded success', props<{data:Data}>());

const edit = createAction('[main] Edit mode enable');


const update = createAction('[modal] update database', props<{updateData:UpdateData}>());

const updated = createAction('[modal] updated database', props<{table:string, data:any}>());

const deleteAction = createAction('[delete modal] delete item from database', props<{deleteData:DeleteData}>());

const deletedAction = createAction('[delete modal] deleted item from database', props<{table:string, data:any}>());

export {load, loaded, edit, update, updated, deleteAction, deletedAction};