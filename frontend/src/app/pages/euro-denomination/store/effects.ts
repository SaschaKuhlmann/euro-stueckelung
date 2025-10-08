import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { EuroDenominationActions } from './actions';
import { euroDenominationFeature } from './reducer';
import { DenominationBackendService, DenominationFrontendService } from './service';

@Injectable()
export class EuroDenominationffects {
  private store = inject(Store);
  private actions = inject(Actions);
  private frontendService = inject(DenominationFrontendService);
  private backendService = inject(DenominationBackendService);

  calcBreakdown$ = createEffect(() =>
    this.actions.pipe(
      ofType(EuroDenominationActions.calculateDenomination),
      withLatestFrom(
        this.store.select(euroDenominationFeature.selectBreakdown),
        this.store.select(euroDenominationFeature.selectOriginIsBackend)
      ),
      exhaustMap(([action, breakdown, originIsBackend]) => {
        const euroValue = action.euroValue;
        if (!originIsBackend) {
          return this.frontendService.calcDenomination(euroValue, breakdown).pipe(
            map((result) =>
              EuroDenominationActions.calculateDenominationFrontendSuccess({ result })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                EuroDenominationActions.calculateDenominationFrontendFailure({ error: error.error })
              )
            )
          );
        }
        return this.backendService.calcDenomination(euroValue, breakdown).pipe(
          map((result) => EuroDenominationActions.calculateDenominationBackendSuccess({ result })),
          catchError((error: HttpErrorResponse) =>
            of(EuroDenominationActions.calculateDenominationBackendFailure({ error: error.error }))
          )
        );
      })
    )
  );
}
