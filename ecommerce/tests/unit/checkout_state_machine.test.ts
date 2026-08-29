import { describe, it, expect } from 'vitest';
import { OrderEntity } from '../../backend/src/models/entities/OrderEntity';

describe('Test Case 4: Order State Machine - Valid Status Transitions', () => {
  it('should transition order from DRAFT -> PENDING_PAYMENT -> PAYMENT_AUTHORIZED -> PROCESSING -> SHIPPED', () => {
    const order = new OrderEntity('ord_01', 'ORD-001', 'usr_01');
    expect(order.status).toBe('DRAFT');

    order.transitionTo('PENDING_PAYMENT');
    expect(order.status).toBe('PENDING_PAYMENT');

    order.transitionTo('PAYMENT_AUTHORIZED');
    expect(order.status).toBe('PAYMENT_AUTHORIZED');

    order.transitionTo('PROCESSING');
    expect(order.status).toBe('PROCESSING');

    order.transitionTo('PACKED');
    expect(order.status).toBe('PACKED');

    order.transitionTo('SHIPPED');
    expect(order.status).toBe('SHIPPED');
  });

  it('should throw error on invalid order status transitions', () => {
    const order = new OrderEntity('ord_02', 'ORD-002', 'usr_02');
    expect(() => order.transitionTo('COMPLETED')).toThrow();
  });
});
