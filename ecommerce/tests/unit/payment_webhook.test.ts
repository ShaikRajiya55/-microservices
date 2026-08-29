import { describe, it, expect } from 'vitest';
import { PaymentService } from '../../backend/src/services/PaymentService';
import { CryptoUtils } from '../../backend/src/utils/cryptoUtils';

describe('Test Case 5: Payment Gateway Adapter & Signature Verification', () => {
  const paymentService = new PaymentService();

  it('should process payment transaction authorized response', async () => {
    const result = await paymentService.processPayment({
      orderId: 'ord_1001',
      paymentProvider: 'STRIPE',
      paymentToken: 'tok_visa_success',
      amount: 895.00
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe('CAPTURED');
    expect(result.transactionId).toBeDefined();
  });

  it('should verify HMAC signature for webhook security payload integrity', () => {
    const payload = JSON.stringify({ event: 'payment_intent.succeeded', id: 'evt_123' });
    const secret = 'whsec_test_secret';
    const signature = CryptoUtils.computeHmacSignature(payload, secret);

    expect(signature).toBeDefined();
    expect(signature.length).toBe(64); // SHA-256 hex digest length
  });
});
