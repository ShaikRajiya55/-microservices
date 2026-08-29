import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_nexuscart_2026_enterprise';

export class CryptoUtils {
  public static async hashPassword(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(plainText, salt);
  }

  public static async comparePassword(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  public static generateJwt(payload: Record<string, any>, expiresInSeconds: number = 86400): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresInSeconds });
  }

  public static generateIdempotencyKey(): string {
    return 'idemp_' + crypto.randomBytes(16).toString('hex');
  }

  public static computeHmacSignature(data: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }
}
