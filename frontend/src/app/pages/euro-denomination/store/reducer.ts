import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EuroDenominationActions } from './actions';
import { DENOMINATIONS, initialBreakdown, type EuroDenominationState } from './model';

const initialState: EuroDenominationState = {
  origin: 'frontend',
  isCalculating: false,
  error: null,
  lastCentValue: 0,
  currentCentValue: 0,
  breakdown: { ...initialBreakdown },
  difference: [],
};
const reducer = createReducer(
  initialState,
  //Set Origin
  on(EuroDenominationActions.setCalcOrigin, (state, action) => ({
    ...state,
    origin: action.origin,
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
    currentCentValue: action.result.newValue,
    lastCentValue: state.currentCentValue,
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
    currentCentValue: action.result.newValue,
    lastCentValue: state.currentCentValue,
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
  extraSelectors: ({ selectBreakdown }) => ({
    selectBreakdownRows: createSelector(selectBreakdown, (breakdown) =>
      DENOMINATIONS.filter((d) => breakdown[d] > 0).map((d) => ({
        denomination: d,
        value: breakdown[d],
      }))
    ),
  }),
});
