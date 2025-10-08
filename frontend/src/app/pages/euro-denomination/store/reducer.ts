import { createFeature, createReducer, on } from '@ngrx/store';
import { EuroDenominationActions } from './actions';
import { initialBreakdown, type EuroDenominationState } from './model';

const initialState: EuroDenominationState = {
  originIsBackend: false,
  isCalculating: false,
  error: null,
  lastEuroValue: 0,
  breakdown: { ...initialBreakdown },
  difference: { ...initialBreakdown },
};
const reducer = createReducer(
  initialState,
  //Toggle Origin
  on(EuroDenominationActions.toggleCalcOrigin, (state) => ({
    ...state,
    originIsBackend: !state.originIsBackend,
  })),
  //Calculate Denomination
  on(EuroDenominationActions.calculateDenomination, (state) => ({
    ...state,
    isCalculating: true,
  })),
  //Calculate Denomination Frontend
  on(EuroDenominationActions.calculateDenominationFrontendSuccess, (state, action) => ({
    ...state,
    isCalculating: false,
    lastEuroValue: action.result.lastEuroValue,
    breakdown: action.result.breakdown,
    difference: action.result.difference,
  })),
  on(EuroDenominationActions.calculateDenominationFrontendFailure, (state, action) => ({
    ...state,
    isCalculating: false,
    error: action.error,
  })),
  //Calculate Denomination Backend
  on(EuroDenominationActions.calculateDenominationBackendSuccess, (state, action) => ({
    ...state,
    isCalculating: false,
    lastEuroValue: action.result.lastEuroValue,
    breakdown: action.result.breakdown,
    difference: action.result.difference,
  })),
  on(EuroDenominationActions.calculateDenominationBackendFailure, (state, action) => ({
    ...state,
    isCalculating: false,
    error: action.error,
  }))
);
export const euroDenominationFeature = createFeature({
  name: 'euroDenominationFeature',
  reducer: reducer,
});
