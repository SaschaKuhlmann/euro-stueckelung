import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { Breakdown, initialBreakdown } from './model';
import { DenominationFrontendService } from './service';

describe('DenominationFrontendService', () => {
  let service: DenominationFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });

    service = TestBed.inject(DenominationFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateBreakdown', () => {
    it('should correctly calculate breakdown for 4532 cents', () => {
      const result: Breakdown = service.calculateBreakdown(4532);

      const expected: Breakdown = {
        20000: 0,
        10000: 0,
        5000: 0,
        2000: 2,
        1000: 0,
        500: 1,
        200: 0,
        100: 0,
        50: 0,
        20: 1,
        10: 1,
        5: 0,
        2: 1,
        1: 0,
      };

      expect(result).toEqual(expected);
    });

    it('should return all zeros for 0', () => {
      const result: Breakdown = service.calculateBreakdown(0);
      expect(result).toEqual(initialBreakdown);
    });
  });

  describe('calculateDifference', () => {
    it('should calculate difference correctly', () => {
      const oldBreakdown: Breakdown = {
        20000: 0,
        10000: 0,
        5000: 0,
        2000: 2,
        1000: 0,
        500: 1,
        200: 0,
        100: 0,
        50: 0,
        20: 1,
        10: 1,
        5: 0,
        2: 1,
        1: 0,
      };
      const newBreakdown: Breakdown = {
        20000: 1,
        10000: 0,
        5000: 0,
        2000: 1,
        1000: 1,
        500: 0,
        200: 2,
        100: 0,
        50: 0,
        20: 1,
        10: 0,
        5: 0,
        2: 1,
        1: 1,
      };

      const diff = service.calculateDifference(oldBreakdown, newBreakdown);

      expect(diff).toEqual([
        { denomination: 20000, value: 1 },
        { denomination: 2000, value: -1 },
        { denomination: 1000, value: 1 },
        { denomination: 500, value: -1 },
        { denomination: 200, value: 2 },
        { denomination: 20, value: 0 },
        { denomination: 10, value: -1 },
        { denomination: 2, value: 0 },
        { denomination: 1, value: 1 },
      ]);
    });

    it('should skip denominations that are zero in both old and new', () => {
      const oldBreakdown: Breakdown = { ...initialBreakdown };
      const newBreakdown: Breakdown = { ...initialBreakdown, 50: 1 };

      const diff = service.calculateDifference(oldBreakdown, newBreakdown);

      expect(diff).toEqual([{ denomination: 50, value: 1 }]);
    });
  });

  describe('calcDenomination', () => {
    it('should return observable with breakdown, difference and newValue', (done) => {
      const oldBreakdown: Breakdown = { ...initialBreakdown, 100: 1 };
      const value = 150;

      service
        .calcDenomination(value, oldBreakdown)
        .pipe(take(1))
        .subscribe((res) => {
          expect(res.newValue).toBe(value);
          expect(res.breakdown[100]).toBe(1);
          expect(res.breakdown[50]).toBe(1);
          expect(res.difference).toEqual([
            { denomination: 100, value: 0 },
            { denomination: 50, value: 1 },
          ]);
          done();
        });
    });
  });
});
