export const DENOMINATIONS = [
  20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1,
] as const; // Denominations in cents
export type Denomination = (typeof DENOMINATIONS)[number];

export type Breakdown = {
  [D in Denomination]: number;
};

export type EuroDenominationState = {
  originIsBackend: boolean;
  isCalculating: boolean;
  error: string | null;
  lastEuroValue: number;
  breakdown: Breakdown;
  difference: Breakdown;
};

export const initialBreakdown: Breakdown = Object.fromEntries(
  DENOMINATIONS.map((d) => [d, 0])
) as Breakdown;

export type DenominationResult = {
  lastEuroValue: number;
  breakdown: Breakdown;
  difference: Breakdown;
};
