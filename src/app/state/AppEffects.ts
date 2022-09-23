import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { DB } from '../services/db.service';
import { create, created, deleteAction, deletedAction, update, updated, updatedImageAction, updateImageAction } from './AppActions';


//!--> Load data
@Injectable()
class LoadEffects {

    constructor(private actions$:Actions, private db:DB){}
 
    loadData$ = createEffect(() => {

        const type = ofType('[main] load data');

        
        const Map = mergeMap(() => {

            const Obs = this.db.getData();
            
            return Obs.pipe(
                map(data => ({type: '[main] loaded success', data })),
                catchError(() => EMPTY)
            )
        });
        
        return this.actions$.pipe(type, Map);

    });
}

//!--> Update data
@Injectable()
class UpdateEffects {

    constructor(private actions$:Actions, private db:DB){}

    updateData$ = createEffect(() => {

        type UpdateAction = ReturnType<typeof update>

        const type = ofType<UpdateAction>(update);

        
        const Map = exhaustMap((action) => {

            const Obs = this.db.updateData((action as UpdateAction).updateData);
            
            return Obs.pipe(
                map(data => (updated(data))),
                catchError(() => EMPTY)
            )
        });
        
        return this.actions$.pipe(type, Map);

    }); 
}

//!--> Delete data
@Injectable()
class DeleteEffects {

    constructor(private actions$:Actions, private db:DB){}

    deleteData$ = createEffect(() => {

        type DeleteAction = ReturnType<typeof deleteAction>

        const type = ofType<DeleteAction>(deleteAction);

        
        const Map = exhaustMap((action) => {

            const Obs = this.db.deleteData((action as DeleteAction).deleteData);
            
            return Obs.pipe(
                map(data => (deletedAction(data))),
                catchError(() => EMPTY)
            )
        });
        
        return this.actions$.pipe(type, Map);
    }); 
}

//!--> Create data
@Injectable()
class CreateEffects {

    constructor(private actions$:Actions, private db:DB){}

    createData$ = createEffect(() => {

        type CreateAction = ReturnType<typeof create>

        const type = ofType<CreateAction>(create);

        
        const Map = exhaustMap((action) => {

            const Obs = this.db.createData((action as CreateAction).createData);
            
            return Obs.pipe(
                map(data => (created(data))),
                catchError(() => EMPTY)
            )
        });
        
        return this.actions$.pipe(type, Map);
    }); 
}

//!--> Update images
@Injectable()
class UpdateImageEffects {

    constructor(private actions$:Actions, private db:DB){}

    updateImage$ = createEffect(() => {

        type UpdateImageAction = ReturnType<typeof updateImageAction>

        const type = ofType<UpdateImageAction>(updateImageAction);

        
        const Map = exhaustMap((action) => {

            const Obs = this.db.updateImage((action as UpdateImageAction).imageDataUpload);
            
            return Obs.pipe(
                map(data => (updatedImageAction(data))),
                catchError(() => EMPTY)
            )
        });
        
        return this.actions$.pipe(type, Map);
    }); 
}

export {LoadEffects, UpdateEffects, DeleteEffects, CreateEffects, UpdateImageEffects}

