import { describe, it, expect } from 'vitest';
import { CartEntity } from '../../backend/src/models/entities/CartEntity';
import { MathUtils } from '../../backend/src/utils/mathUtils';

describe('Test Case 3: Cart Math - Subtotal, Coupon Discounts, Tax & Shipping', () => {
  it('should calculate accurate cart subtotals and item subtotals', () => {
    const cart = new CartEntity('cart_test_01');
    cart.addItem({
      id: 'ci_01',
      variantId: 'var_laptop_01',
      productName: 'Pro Laptop',
      variantTitle: 'Default',
      sku: 'SKU-01',
      unitPrice: 1000.00,
      quantity: 2,
      itemSubtotal: 2000.00
    });

    expect(cart.getSubtotal()).toBe(2000.00);
  });

  it('should apply percentage coupon discounts correctly', () => {
    const cart = new CartEntity('cart_test_02');
    cart.addItem({
      id: 'ci_01',
      variantId: 'var_laptop_01',
      productName: 'Pro Laptop',
      variantTitle: 'Default',
      sku: 'SKU-01',
      unitPrice: 1000.00,
      quantity: 1,
      itemSubtotal: 1000.00
    });

    const discountAmount = MathUtils.calculatePercentageDiscount(cart.getSubtotal(), 20); // 20% OFF
    expect(discountAmount).toBe(200.00);
    cart.applyCoupon('NEXUS20', discountAmount);

    const totals = cart.calculateTotals(10, 15.0); // 10% Tax, $15 Shipping
    // Subtotal: 1000, Discount: 200 => Taxable: 800 => Tax: 80 => Grand Total: 800 + 80 + 15 = 895
    expect(totals.grandTotal).toBe(895.00);
  });
});
