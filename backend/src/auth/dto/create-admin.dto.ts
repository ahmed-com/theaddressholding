// src/auth/dto/create-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'Username for the new admin', example: 'admin_jane' })
  username: string;

  @ApiProperty({ description: 'Email for the new admin', example: 'admin@example.com' })
  email: string;

  @ApiProperty({ description: 'Password for the new admin account', example: 'AdminStrongPass123!' })
  password: string;
}
