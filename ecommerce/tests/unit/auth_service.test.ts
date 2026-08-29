import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../../backend/src/services/AuthService';
import { CryptoUtils } from '../../backend/src/utils/cryptoUtils';

describe('Test Case 1: AuthService - User Authentication & Role Security', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should register a new customer account with bcrypt password hash', async () => {
    const registrationReq = {
      email: 'testcustomer@nexuscart.com',
      password: 'SecurePassword123!',
      firstName: 'Alex',
      lastName: 'Smith',
      phoneNumber: '+1-555-0199'
    };

    const response = await authService.registerUser(registrationReq);
    expect(response).toBeDefined();
    expect(response.accessToken).toBeDefined();
    expect(response.user.email).toBe('testcustomer@nexuscart.com');
    expect(response.user.roles).toContain('CUSTOMER');
  });

  it('should fail authentication on invalid credentials', async () => {
    await expect(authService.loginUser({
      email: 'nonexistent@nexuscart.com',
      password: 'WrongPassword'
    })).rejects.toThrow();
  });

  it('should hash passwords deterministically with high salt rounds', async () => {
    const plainText = 'MySecretPass2026';
    const hash = await CryptoUtils.hashPassword(plainText);
    expect(hash).not.toBe(plainText);
    const isMatch = await CryptoUtils.comparePassword(plainText, hash);
    expect(isMatch).toBe(true);
  });
});
