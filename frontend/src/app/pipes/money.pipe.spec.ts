import { CurrencyPipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  let pipe: MoneyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe, MoneyPipe, provideZonelessChangeDetection()],
    });

    pipe = TestBed.inject(MoneyPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform cents to formatted EUR by default', () => {
    const result = pipe.transform(12345);
    expect(result).toBe('€123.45');
  });

  it('should transform with specified currency code', () => {
    const result = pipe.transform(12345, 'USD');
    expect(result).toBe('$123.45');
  });

  it('should support custom digitsInfo', () => {
    const result = pipe.transform(12345, 'EUR', 'symbol', '1.0-0'); // no decimals
    expect(result).toBe('€123');
  });

  it('should support narrow symbol display', () => {
    const result = pipe.transform(12345, 'EUR', 'symbol-narrow');
    expect(result).toBe('€123.45');
  });
});
