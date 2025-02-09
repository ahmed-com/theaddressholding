// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersService } from './users/user.service';
import { UserRole } from './users/user.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup (if needed)
  const config = new DocumentBuilder()
    .setTitle('Apartment Listing API')
    .setDescription('API documentation for the Apartment Listing Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Check for the special command to create the root admin
  if (process.argv[2] === 'create-root-user') {
    const usersService = app.get(UsersService);
    const existingAdmin = await usersService.findAdminUser();
    if (!existingAdmin) {
      const rootUsername = process.env.ROOT_USERNAME || 'root_admin';
      const rootEmail = process.env.ROOT_EMAIL || 'root@example.com';
      const rootPassword = process.env.ROOT_PASSWORD || 'ChangeMe123!';
      const hashedPassword = await bcrypt.hash(rootPassword, 10);
      await usersService.createUser({
        username: rootUsername,
        email: rootEmail,
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
      });
      console.log(`Root admin created:
        Username: ${rootUsername}
        Email: ${rootEmail}`);
    } else {
      console.log('Admin user already exists. Skipping root user creation.');
    }
    process.exit(0); // Exit after the command runs.
  }

  app.enableCors();

  await app.listen(8080);
}
bootstrap();
