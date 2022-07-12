import {createAction, props} from '@ngrx/store';
import { Data } from '../models/models';


const load = createAction('[main] load data');

const loaded = createAction('[main] loaded success', props<Data>());


export {load, loaded};