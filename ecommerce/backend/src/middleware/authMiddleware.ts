import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../core/Errors';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    roles: string[];
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_nexuscart_2026_enterprise';

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or malformed Authorization header'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      roles: decoded.roles || []
    };
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired authentication token'));
  }
}

export function authorize(requiredRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User unauthenticated'));
    }

    const hasRole = req.user.roles.some(role => requiredRoles.includes(role) || role === 'SUPER_ADMIN');
    if (!hasRole) {
      return next(new ForbiddenError(`Role level missing. Required one of: ${requiredRoles.join(', ')}`));
    }

    next();
  };
}
