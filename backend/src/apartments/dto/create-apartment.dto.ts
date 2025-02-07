// src/apartments/dto/create-apartment.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({
    description: 'The title of the apartment listing',
    example: 'Spacious 2-bedroom apartment in downtown',
  })
  title: string;

  @ApiProperty({
    description: 'A detailed description of the apartment',
    example: 'A modern apartment with 2 bedrooms, 2 bathrooms, and a fully-equipped kitchen.',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the apartment',
    example: 1200.5,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'The address of the apartment',
    example: '123 Main St, City, Country',
  })
  address: string;

  // This field will be overwritten in the controller with the generated image URLs.
  @ApiProperty({
    description: 'A list of image URLs for the apartment',
    type: [String],
    required: false,
    example: ['http://localhost:80/uploads/apartments/abc123.jpg'],
  })
  images?: string[];
}
