// src/auth/dto/register-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'Username for the new account', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: 'Email for the new account', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: 'Password for the new account', example: 'StrongPassword123!' })
  password: string;
}
