import { Decimal128 } from "mongodb";
import Decimal from "decimal.js";

// Set precision for decimal calculations
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Converts various value types to MongoDB Decimal128 with 2 decimal places.
 */
export function toDecimal128(val: string | number | Decimal | Decimal128): Decimal128 {
  if (val instanceof Decimal128) {
    return val;
  }
  const d = new Decimal(val.toString()).toFixed(2);
  return Decimal128.fromString(d);
}

/**
 * Converts a Decimal128 or other numeric value to an exact 2-decimal rupee string for API DTOs.
 * Example: "1200.00"
 */
export function toRupeeString(val: Decimal128 | Decimal | string | number | null | undefined): string {
  if (val === null || val === undefined) {
    return "0.00";
  }
  const str = val.toString();
  return new Decimal(str).toFixed(2);
}

/**
 * Formats a rupee amount for customer UI display.
 * Example: "₹1,200.00"
 */
export function formatRupeesDisplay(val: Decimal128 | Decimal | string | number | null | undefined): string {
  if (val === null || val === undefined) {
    return "₹0.00";
  }
  const d = new Decimal(val.toString());
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(d.toNumber());

  return `₹${formattedNumber}`;
}

/**
 * Calculates line item total: unitPriceRupees * quantity
 */
export function calculateLineTotal(
  unitPriceRupees: Decimal128 | string,
  quantity: number
): { decimal128: Decimal128; string: string } {
  const price = new Decimal(unitPriceRupees.toString());
  const qty = new Decimal(quantity);
  const total = price.times(qty).toFixed(2);

  return {
    decimal128: Decimal128.fromString(total),
    string: total,
  };
}

/**
 * Sums an array of rupee values with exact precision.
 */
export function sumRupees(values: (Decimal128 | string | number)[]): { decimal128: Decimal128; string: string } {
  const sum = values.reduce<Decimal>((acc, val) => {
    return acc.plus(new Decimal(val.toString()));
  }, new Decimal(0)).toFixed(2);

  return {
    decimal128: Decimal128.fromString(sum),
    string: sum,
  };
}
