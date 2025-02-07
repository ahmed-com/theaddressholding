import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment]), UsersModule],
  providers: [ApartmentsService],
  controllers: [ApartmentsController],
})
export class ApartmentsModule {}
