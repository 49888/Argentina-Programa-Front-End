import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { DB } from '../services/db.service';

 
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

export {LoadEffects}

