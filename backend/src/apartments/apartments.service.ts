import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentsRepository: Repository<Apartment>,
  ) {}

  async findAll(): Promise<Apartment[]> {
    return this.apartmentsRepository.find();
  }

  async findOne(id: string): Promise<Apartment> {
    const apartment = await this.apartmentsRepository.findOne({ where: { id } });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  async create(apartmentData: Partial<Apartment>): Promise<Apartment> {
    const apartment = this.apartmentsRepository.create(apartmentData);
    return this.apartmentsRepository.save(apartment);
  }
}
