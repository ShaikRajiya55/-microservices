import { Response, NextFunction } from 'express';
import { CheckoutService } from '../services/CheckoutService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  public checkout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId || 'guest_user';
      const order = await this.checkoutService.processCheckout(req.body, userId);
      res.status(201).json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  };
}
