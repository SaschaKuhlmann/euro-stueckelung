import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { type DenominationResult } from './model';

export const EuroDenominationActions = createActionGroup({
  source: 'Euro Denomination API',
  events: {
    'Toggle Calc Origin': emptyProps(),
    'Calculate Denomination': props<{ euroValue: number }>(),
    'Calculate Denomination Backend Success': props<{ result: DenominationResult }>(),
    'Calculate Denomination Backend Failure': props<{ error: string }>(),
    'Calculate Denomination Frontend Success': props<{ result: DenominationResult }>(),
    'Calculate Denomination Frontend Failure': props<{ error: string }>(),
  },
});
