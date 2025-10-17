import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true,
})
export class MoneyPipe implements PipeTransform {
  private currencyPipe = inject(CurrencyPipe);
  transform(
    valueInCents: number,
    currencyCode: string = 'EUR',
    display: 'symbol' | 'code' | 'symbol-narrow' | string = 'symbol',
    digitsInfo: string = '1.2-2',
    locale?: string
  ): string | null {
    if (valueInCents == null) return null;

    const value = valueInCents / 100;
    return this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
  }
}
