import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { BreakdownTableComponent } from './breakdown-table/breakdown-table.component';
import { DifferenceTableComponent } from './difference-table/difference-table.component';
import { EuroDenominationActions } from './store/actions';
import { calcOriginOptions, type DenomOrigin } from './store/model';
import { euroDenominationFeature } from './store/reducer';

@Component({
  selector: 'app-euro-denomination',
  imports: [
    MatRadioGroup,
    MatRadioButton,
    MatLabel,
    BreakdownTableComponent,
    DifferenceTableComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './euro-denomination.component.html',
  styleUrl: './euro-denomination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuroDenominationComponent {
  private store = inject(Store);
  readonly breakdownRows = this.store.selectSignal(euroDenominationFeature.selectBreakdownRows);
  readonly difference = this.store.selectSignal(euroDenominationFeature.selectDifference);
  readonly error = this.store.selectSignal(euroDenominationFeature.selectError);
  readonly isCalculating = this.store.selectSignal(euroDenominationFeature.selectIsCalculating);
  readonly lastCentValue = this.store.selectSignal(euroDenominationFeature.selectLastCentValue);
  readonly currentCentValue = this.store.selectSignal(
    euroDenominationFeature.selectCurrentCentValue
  );
  readonly origin = this.store.selectSignal(euroDenominationFeature.selectOrigin);

  readonly originOptions = calcOriginOptions;
  public currencyControl = new FormControl(0, [
    Validators.required,
    Validators.pattern(/^(?:\d+|\d*\.\d{1,2})$/),
  ]);

  calculateDenomination(euroValue: number) {
    const newCentValue = euroValue * 100;
    this.store.dispatch(EuroDenominationActions.calculateDenomination({ newCentValue }));
  }
  setOrigin(origin: DenomOrigin) {
    this.store.dispatch(EuroDenominationActions.setCalcOrigin({ origin }));
  }
}
