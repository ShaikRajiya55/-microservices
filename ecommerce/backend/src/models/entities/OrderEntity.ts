import { OrderDTO } from '../types';

export class OrderEntity {
  constructor(
    public readonly id: string,
    public readonly orderNumber: string,
    public readonly userId: string,
    public status: string = 'DRAFT',
    public items: any[] = [],
    public subtotalAmount: number = 0,
    public discountAmount: number = 0,
    public taxAmount: number = 0,
    public shippingAmount: number = 0,
    public grandTotal: number = 0,
    public currency: string = 'USD',
    public readonly createdAt: Date = new Date()
  ) {}

  public transitionTo(newStatus: string): void {
    const allowedTransitions: Record<string, string[]> = {
      'DRAFT': ['PENDING_PAYMENT', 'CANCELLED'],
      'PENDING_PAYMENT': ['PAYMENT_AUTHORIZED', 'CANCELLED'],
      'PAYMENT_AUTHORIZED': ['PROCESSING', 'CANCELLED'],
      'PROCESSING': ['PACKED', 'CANCELLED'],
      'PACKED': ['SHIPPED', 'CANCELLED'],
      'SHIPPED': ['DELIVERED'],
      'DELIVERED': ['COMPLETED', 'REFUNDED'],
      'COMPLETED': ['REFUNDED']
    };

    const currentAllowed = allowedTransitions[this.status] || [];
    if (!currentAllowed.includes(newStatus)) {
      throw new Error(`Invalid order status transition from ${this.status} to ${newStatus}`);
    }

    this.status = newStatus;
  }

  public toDTO(): OrderDTO {
    return {
      id: this.id,
      orderNumber: this.orderNumber,
      userId: this.userId,
      status: this.status,
      items: this.items,
      subtotalAmount: this.subtotalAmount,
      discountAmount: this.discountAmount,
      taxAmount: this.taxAmount,
      shippingAmount: this.shippingAmount,
      grandTotal: this.grandTotal,
      currency: this.currency,
      createdAt: this.createdAt
    };
  }
}
