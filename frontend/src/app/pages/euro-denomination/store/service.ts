import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { type Breakdown, type DenominationResult, DENOMINATIONS, initialBreakdown } from './model';

@Injectable({
  providedIn: 'root',
})
export class DenominationBackendService {
  private api = 'dummy.com'; // `${environment.serverRef}/cartan`;
  private http = inject(HttpClient);

  calcDenomination(value: number, oldBreakdown: Breakdown) {
    const url = `${this.api}/calc/denomination`;
    return this.http.post<DenominationResult>(url, { value, oldBreakdown });
  }
}
@Injectable({
  providedIn: 'root',
})
export class DenominationFrontendService {
  calcDenomination(value: number, oldBreakdown: Breakdown) {
    const newBreakdown = this.calculateBreakdown(value);
    const difference = this.calculateDifference(oldBreakdown, newBreakdown);
    return of({ breakdown: newBreakdown, difference, lastEuroValue: value });
  }

  calculateBreakdown(amountEuro: number): Breakdown {
    let remaining = Math.round(amountEuro * 100);
    const breakdown = { ...initialBreakdown };

    for (const denom of DENOMINATIONS) {
      const count = Math.floor(remaining / denom);
      breakdown[denom] = count;
      remaining -= count * denom;
    }

    return breakdown;
  }

  calculateDifference(oldBreakdown: Breakdown, newBreakdown: Breakdown) {
    const diff = { ...initialBreakdown };
    for (const denom of DENOMINATIONS) {
      diff[denom] = newBreakdown[denom] - oldBreakdown[denom];
    }
    return diff;
  }
}
