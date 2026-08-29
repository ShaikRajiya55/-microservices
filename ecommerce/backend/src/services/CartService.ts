import { CartEntity } from '../models/entities/CartEntity';
import { CartDTO, CartItemDTO } from '../models/types';
import { NotFoundError, ValidationError } from '../core/Errors';

export class CartService {
  private cartsMap: Map<string, CartEntity> = new Map();

  public async getOrCreateCart(cartId?: string, userId?: string, sessionId?: string): Promise<CartEntity> {
    if (cartId && this.cartsMap.has(cartId)) {
      return this.cartsMap.get(cartId)!;
    }

    const newCartId = cartId || 'cart_' + Math.random().toString(36).substring(2, 9);
    const cart = new CartEntity(newCartId, userId, sessionId);
    this.cartsMap.set(newCartId, cart);
    return cart;
  }

  public async addItemToCart(cartId: string, item: CartItemDTO): Promise<CartDTO> {
    const cart = await this.getOrCreateCart(cartId);
    cart.addItem(item);
    return cart.calculateTotals();
  }

  public async applyCouponToCart(cartId: string, couponCode: string): Promise<CartDTO> {
    const cart = await this.getOrCreateCart(cartId);
    if (couponCode.toUpperCase() === 'NEXUS20') {
      const discount = cart.getSubtotal() * 0.20;
      cart.applyCoupon('NEXUS20', discount);
    } else {
      throw new ValidationError(`Coupon code '${couponCode}' is invalid or expired.`);
    }
    return cart.calculateTotals();
  }
}
