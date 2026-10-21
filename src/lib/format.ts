/**
 * Client-safe Indian Rupee currency formatting utility.
 * Safe for use in Client Components and Server Components without pulling in Node/MongoDB dependencies.
 */
export function formatRupeesDisplay(val: string | number | null | undefined): string {
  if (val === null || val === undefined || val === "") {
    return "₹0.00";
  }

  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) {
    return "₹0.00";
  }

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);

  return `₹${formattedNumber}`;
}
