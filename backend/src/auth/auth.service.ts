import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User, UserRole } from '../users/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user: Omit<User, 'passwordHash'>,
  ): Promise<{ access_token: string; role: UserRole }> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }

  // Public registration creates a normal user
  async register(
    registerDto: RegisterUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.createUser({
      username: registerDto.username,
      email: registerDto.email,
      passwordHash: hashedPassword,
      role: UserRole.USER,
    });
    const { passwordHash, ...result } = user;
    return result;
  }

  // Admin creation endpoint to create admin users
  async createAdmin(
    createAdminDto: CreateAdminDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = await this.usersService.createUser({
      username: createAdminDto.username,
      email: createAdminDto.email,
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
    });
    const { passwordHash, ...result } = admin;
    return result;
  }
}
