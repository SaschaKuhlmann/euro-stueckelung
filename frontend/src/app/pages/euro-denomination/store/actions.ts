import { createActionGroup, props } from '@ngrx/store';
import { type DenominationResult, type DenomOrigin } from './model';

export const EuroDenominationActions = createActionGroup({
  source: 'Euro Denomination API',
  events: {
    'Set Calc Origin': props<{ origin: DenomOrigin }>(),
    'Calculate Denomination': props<{ newCentValue: number }>(),
    'Calculate Denomination Backend Success': props<{ result: DenominationResult }>(),
    'Calculate Denomination Backend Failure': props<{ error: string }>(),
    'Calculate Denomination Frontend Success': props<{ result: DenominationResult }>(),
    'Calculate Denomination Frontend Failure': props<{ error: string }>(),
  },
});
