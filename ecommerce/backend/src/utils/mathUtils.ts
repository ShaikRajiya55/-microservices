export class MathUtils {
  public static roundCurrency(amount: number): number {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  public static calculatePercentageDiscount(originalPrice: number, percentage: number): number {
    if (percentage <= 0) return 0;
    if (percentage >= 100) return originalPrice;
    const discount = (originalPrice * percentage) / 100;
    return this.roundCurrency(discount);
  }

  public static calculateTaxAmount(amount: number, taxRatePercentage: number): number {
    const tax = (amount * taxRatePercentage) / 100;
    return this.roundCurrency(tax);
  }

  public static convertCurrency(amount: number, fromRate: number, toRate: number): number {
    const baseAmount = amount / fromRate;
    return this.roundCurrency(baseAmount * toRate);
  }
}
