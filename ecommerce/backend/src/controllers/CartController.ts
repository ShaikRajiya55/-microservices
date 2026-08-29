import { Request, Response, NextFunction } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
  constructor(private cartService: CartService) {}

  public getCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cartId = req.params.cartId || req.query.cartId as string;
      const cart = await this.cartService.getOrCreateCart(cartId);
      res.status(200).json({ success: true, data: cart.calculateTotals() });
    } catch (err) {
      next(err);
    }
  };

  public addItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cartId = req.params.cartId;
      const updated = await this.cartService.addItemToCart(cartId, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  };

  public applyCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cartId = req.params.cartId;
      const { couponCode } = req.body;
      const updated = await this.cartService.applyCouponToCart(cartId, couponCode);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  };
}
