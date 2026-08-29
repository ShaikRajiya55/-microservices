import { CartDTO, CartItemDTO } from '../types';

export class CartEntity {
  public items: CartItemDTO[] = [];
  public couponCode?: string;
  public discountTotal: number = 0;

  constructor(
    public readonly id: string,
    public userId?: string,
    public sessionId?: string
  ) {}

  public addItem(item: CartItemDTO): void {
    const existingIndex = this.items.findIndex(i => i.variantId === item.variantId);
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += item.quantity;
      this.items[existingIndex].itemSubtotal = this.items[existingIndex].quantity * this.items[existingIndex].unitPrice;
    } else {
      this.items.push({
        ...item,
        itemSubtotal: item.quantity * item.unitPrice
      });
    }
  }

  public updateQuantity(variantId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(variantId);
      return;
    }
    const item = this.items.find(i => i.variantId === variantId);
    if (item) {
      item.quantity = quantity;
      item.itemSubtotal = item.quantity * item.unitPrice;
    }
  }

  public removeItem(variantId: string): void {
    this.items = this.items.filter(i => i.variantId !== variantId);
  }

  public getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.itemSubtotal, 0);
  }

  public applyCoupon(code: string, discountAmount: number): void {
    this.couponCode = code;
    this.discountTotal = Math.min(discountAmount, this.getSubtotal());
  }

  public removeCoupon(): void {
    this.couponCode = undefined;
    this.discountTotal = 0;
  }

  public calculateTotals(taxRatePercentage: number = 8.5, shippingCost: number = 15.0): CartDTO {
    const subtotal = this.getSubtotal();
    const discountedSubtotal = Math.max(0, subtotal - this.discountTotal);
    const estimatedTax = (discountedSubtotal * taxRatePercentage) / 100;
    const grandTotal = discountedSubtotal + estimatedTax + (this.items.length > 0 ? shippingCost : 0);

    return {
      id: this.id,
      userId: this.userId,
      sessionId: this.sessionId,
      items: this.items,
      subtotal,
      discountTotal: this.discountTotal,
      couponCode: this.couponCode,
      estimatedTax: Number(estimatedTax.toFixed(2)),
      estimatedShipping: this.items.length > 0 ? shippingCost : 0,
      grandTotal: Number(grandTotal.toFixed(2))
    };
  }
}
