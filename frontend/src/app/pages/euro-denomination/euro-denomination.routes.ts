import { type Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EuroDenominationComponent } from './euro-denomination.component';
import { EuroDenominationffects } from './store/effects';
import { euroDenominationFeature } from './store/reducer';

export const euroDenominationRoutes: Routes = [
  {
    path: '',
    providers: [provideState(euroDenominationFeature), provideEffects(EuroDenominationffects)],
    children: [{ path: '', component: EuroDenominationComponent }],
  },
];
