import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MoneyPipe } from '../../../pipes/money-pipe';
import { SignNumberPipe } from '../../../pipes/sign-number-pipe';
import { formatBreakdown, type Breakdown } from '../store/model';

@Component({
  selector: 'app-difference-table',
  imports: [MatTableModule, MoneyPipe, SignNumberPipe],
  templateUrl: './difference-table.component.html',
  styleUrl: './difference-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferenceTableComponent {
  difference = input.required<Breakdown>();
  lastCentValue = input.required<number>();
  differenceRow = computed(() => {
    const breakdown = this.difference();
    return formatBreakdown(breakdown, false);
  });
  displayedColumns: string[] = ['denomination', 'value'];
}
