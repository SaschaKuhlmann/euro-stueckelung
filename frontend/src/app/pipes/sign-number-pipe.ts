import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signNumber',
})
export class SignNumberPipe implements PipeTransform {
  transform(value: number, fractionDigits: number = 0): string {
    if (value == null || isNaN(value)) return '';
    const formatted = value.toFixed(fractionDigits);
    return value > 0 ? `+${formatted}` : formatted;
  }
}
