import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MoneyPipe } from '../../../pipes/money-pipe';
import { SignNumberPipe } from '../../../pipes/sign-number-pipe';
import { type BreakdownRow } from '../store/model';

@Component({
  selector: 'app-difference-table',
  imports: [
    MatTableModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MoneyPipe,
    SignNumberPipe,
  ],
  templateUrl: './difference-table.component.html',
  styleUrl: './difference-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferenceTableComponent {
  difference = input.required<BreakdownRow[]>();
  lastCentValue = input.required<number>();

  displayedColumns: string[] = ['denomination', 'value'];
}
