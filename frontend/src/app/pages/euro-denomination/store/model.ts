export const DENOMINATIONS = [
  20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1,
] as const; // Denominations in cents
export type Denomination = (typeof DENOMINATIONS)[number];

export type Breakdown = {
  [D in Denomination]: number;
};
export const calcOriginOptions = [
  { value: 'frontend', viewValue: $localize`Frontend` },
  { value: 'backend', viewValue: $localize`Backend` },
] as const;
export type DenomOrigin = (typeof calcOriginOptions)[number]['value'];

export type EuroDenominationState = {
  origin: DenomOrigin;
  isCalculating: boolean;
  error: string | null;
  currentCentValue: number;
  lastCentValue: number;
  breakdown: Breakdown;
  difference: BreakdownRow[];
};

export const initialBreakdown: Breakdown = Object.fromEntries(
  DENOMINATIONS.map((d) => [d, 0])
) as Breakdown;

export type DenominationResult = {
  newValue: number;
  breakdown: Breakdown;
  difference: BreakdownRow[];
};

export type BreakdownRow = {
  denomination: Denomination;
  value: number;
};

export function formatBreakdown(breakdown: Breakdown, filterZero: boolean): BreakdownRow[] {
  const breakdownrow = DENOMINATIONS.map((d) => ({ denomination: d, value: breakdown[d] }));
  return filterZero ? breakdownrow.filter((row) => row.value > 0) : breakdownrow;
}
