import { CryptoUtils } from '../utils/cryptoUtils';
import { UserEntity } from '../models/entities/UserEntity';
import { RegisterUserRequest, LoginUserRequest, AuthTokenResponse, UserDTO } from '../models/types';
import { AppError, UnauthorizedError, ConflictError } from '../core/Errors';
import { EventBus } from '../core/EventBus';

export class AuthService {
  private usersMap: Map<string, UserEntity> = new Map();

  constructor() {
    this.seedDefaultAdmin();
  }

  private async seedDefaultAdmin(): Promise<void> {
    const adminPassHash = await CryptoUtils.hashPassword('AdminPass2026!');
    const admin = new UserEntity(
      'user_admin_001',
      'admin@nexuscart.com',
      adminPassHash,
      'Nexus',
      'Administrator',
      '+1-800-555-0199',
      'https://assets.nexuscart.com/avatars/admin.png',
      true,
      true,
      ['SUPER_ADMIN', 'ADMIN']
    );
    this.usersMap.set(admin.email.toLowerCase(), admin);
  }

  public async registerUser(req: RegisterUserRequest): Promise<AuthTokenResponse> {
    const normalizedEmail = req.email.toLowerCase();
    if (this.usersMap.has(normalizedEmail)) {
      throw new ConflictError(`User with email '${req.email}' already exists.`);
    }

    const passwordHash = await CryptoUtils.hashPassword(req.password);
    const userId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const user = new UserEntity(
      userId,
      normalizedEmail,
      passwordHash,
      req.firstName,
      req.lastName,
      req.phoneNumber,
      undefined,
      false,
      true,
      ['CUSTOMER']
    );

    this.usersMap.set(normalizedEmail, user);
    await EventBus.getInstance().publish('UserRegistered', { userId: user.id, email: user.email });

    return this.generateTokens(user);
  }

  public async loginUser(req: LoginUserRequest): Promise<AuthTokenResponse> {
    const normalizedEmail = req.email.toLowerCase();
    const user = this.usersMap.get(normalizedEmail);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password credentials');
    }

    const isMatch = await CryptoUtils.comparePassword(req.password, user.getPasswordHash());
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password credentials');
    }

    if (!user.isActive) {
      throw new AppError('User account is suspended. Contact customer support.', 403);
    }

    await EventBus.getInstance().publish('UserLoggedIn', { userId: user.id, loginAt: new Date() });
    return this.generateTokens(user);
  }

  public async getUserById(userId: string): Promise<UserDTO> {
    for (const user of this.usersMap.values()) {
      if (user.id === userId) {
        return user.toDTO();
      }
    }
    throw new AppError('User account not found', 404);
  }

  private generateTokens(user: UserEntity): AuthTokenResponse {
    const accessToken = CryptoUtils.generateJwt({
      userId: user.id,
      email: user.email,
      roles: user.roles
    }, 86400);

    const refreshToken = CryptoUtils.generateJwt({
      userId: user.id,
      type: 'refresh'
    }, 604800);

    return {
      accessToken,
      refreshToken,
      expiresIn: 86400,
      user: user.toDTO()
    };
  }
}
