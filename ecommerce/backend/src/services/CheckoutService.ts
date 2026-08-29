import { CreateOrderRequest, OrderDTO } from '../models/types';
import { CartService } from './CartService';
import { OrderEntity } from '../models/entities/OrderEntity';
import { StringUtils } from '../utils/stringUtils';

export class CheckoutService {
  constructor(private cartService: CartService) {}

  public async processCheckout(req: CreateOrderRequest, userId: string): Promise<OrderDTO> {
    const cartEntity = await this.cartService.getOrCreateCart(req.cartId);
    const cartTotals = cartEntity.calculateTotals();

    if (cartTotals.items.length === 0) {
      throw new Error('Cannot checkout with an empty shopping cart');
    }

    const orderNumber = StringUtils.generateOrderNumber();
    const orderId = 'ord_' + Math.random().toString(36).substring(2, 9);

    const order = new OrderEntity(
      orderId,
      orderNumber,
      userId,
      'PENDING_PAYMENT',
      cartTotals.items,
      cartTotals.subtotal,
      cartTotals.discountTotal,
      cartTotals.estimatedTax,
      cartTotals.estimatedShipping,
      cartTotals.grandTotal,
      'USD'
    );

    return order.toDTO();
  }
}
