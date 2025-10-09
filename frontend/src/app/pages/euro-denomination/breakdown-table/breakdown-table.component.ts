import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MoneyPipe } from '../../../pipes/money-pipe';
import { type Breakdown, formatBreakdown } from '../store/model';

@Component({
  selector: 'app-breakdown-table',
  imports: [MatTableModule, MoneyPipe],
  templateUrl: './breakdown-table.component.html',
  styleUrl: './breakdown-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakdownTableComponent {
  breakdown = input.required<Breakdown>();
  currentCentValue = input.required<number>();

  breakdownRow = computed(() => {
    const breakdown = this.breakdown();
    return formatBreakdown(breakdown, true);
  });
  displayedColumns: string[] = ['denomination', 'value'];
}
