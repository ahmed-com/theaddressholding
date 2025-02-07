// src/apartments/dto/apartment-details.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ApartmentDetailsDto {
  @ApiProperty({
    description: 'Unique identifier for the apartment',
    example: 'c2a77e2e-0e21-4f09-8a2e-6d2d3f78fabc',
  })
  id: string;

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

  @ApiProperty({
    description: 'A list of image URLs for the apartment',
    type: [String],
    required: false,
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  })
  images?: string[];

  @ApiProperty({
    description: 'Date when the apartment listing was created',
    example: '2021-09-01T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the apartment listing was last updated',
    example: '2021-09-10T12:34:56.789Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'ID of the admin user who created the apartment',
    example: 'd8d8d8d8-0e21-4f09-8a2e-6d2d3f78abcd',
  })
  createdBy: string;
}
