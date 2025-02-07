// src/apartments/dto/apartment-index.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ApartmentIndexDto {
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
    description: 'Thumbnail image URL for the apartment (first image in the list)',
    example: 'https://example.com/image1.jpg',
    required: false,
  })
  thumbnail?: string;
}
