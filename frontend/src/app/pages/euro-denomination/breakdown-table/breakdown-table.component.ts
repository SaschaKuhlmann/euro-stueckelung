import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MoneyPipe } from '../../../pipes/money.pipe';
import { BreakdownRow } from '../store/model';
@Component({
  selector: 'app-breakdown-table',
  imports: [MatTableModule, MatCard, MatCardTitle, MatCardContent, MatCardHeader, MoneyPipe],
  templateUrl: './breakdown-table.component.html',
  styleUrl: './breakdown-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakdownTableComponent {
  breakdownRows = input.required<BreakdownRow[]>();
  currentCentValue = input.required<number>();
  displayedColumns: string[] = ['denomination', 'value'];
}
