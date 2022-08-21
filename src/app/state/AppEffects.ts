import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { DB } from '../services/db.service';
import { deleteAction, deletedAction, update, updated } from './AppActions';

 
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

export {LoadEffects, UpdateEffects, DeleteEffects}

