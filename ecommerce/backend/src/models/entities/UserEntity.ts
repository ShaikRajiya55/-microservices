import { UserDTO } from '../types';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private passwordHash: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber?: string,
    public avatarUrl?: string,
    public isEmailVerified: boolean = false,
    public isActive: boolean = true,
    public roles: string[] = ['CUSTOMER'],
    public readonly createdAt: Date = new Date()
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public setPasswordHash(newHash: string): void {
    if (!newHash || newHash.length < 10) {
      throw new Error('Invalid password hash complexity');
    }
    this.passwordHash = newHash;
  }

  public hasRole(roleName: string): boolean {
    return this.roles.includes(roleName) || this.roles.includes('SUPER_ADMIN');
  }

  public toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      avatarUrl: this.avatarUrl,
      isEmailVerified: this.isEmailVerified,
      isActive: this.isActive,
      roles: this.roles,
      createdAt: this.createdAt
    };
  }
}
