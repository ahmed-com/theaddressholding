// src/apartments/apartments.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApartmentsService } from './apartments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { ApartmentIndexDto } from './dto/apartment-index.dto';
import { ApartmentDetailsDto } from './dto/apartment-details.dto';
import { Apartment } from './apartment.entity';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of apartment listings' })
  @ApiResponse({
    status: 200,
    description: 'List of apartments retrieved successfully.',
    type: ApartmentIndexDto,
    isArray: true,
  })
  async findAll(): Promise<ApartmentIndexDto[]> {
    const apartments = await this.apartmentsService.findAll();
    // Mapping the apartment entity to the index DTO.
    return apartments.map((apartment) => ({
      id: apartment.id,
      title: apartment.title,
      price: apartment.price,
      address: apartment.address,
      thumbnail:
        apartment.images && apartment.images.length > 0
          ? apartment.images[0]
          : undefined,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific apartment listing by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the apartment',
  })
  @ApiResponse({
    status: 200,
    description: 'Apartment details retrieved successfully.',
    type: ApartmentDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Apartment not found.' })
  async findOne(@Param('id') id: string): Promise<ApartmentDetailsDto> {
    const apartment = await this.apartmentsService.findOne(id);
    // Mapping the apartment entity to the details DTO.
    return {
      id: apartment.id,
      title: apartment.title,
      description: apartment.description,
      price: apartment.price,
      address: apartment.address,
      images: apartment.images,
      createdAt: apartment.createdAt,
      updatedAt: apartment.updatedAt,
      createdBy: apartment.createdBy ? apartment.createdBy.id : undefined,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new apartment listing (Admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Apartment creation data with images',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Spacious Apartment in Downtown',
        },
        description: {
          type: 'string',
          example: 'A lovely apartment with modern amenities.',
        },
        price: {
          type: 'number',
          example: 1200.5,
        },
        address: {
          type: 'string',
          example: '123 Main St, City, Country',
        },
        // Swagger does not natively support array of files well,
        // so we use this approach to signal file upload.
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: ['title', 'description', 'address'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/apartments',
        filename: (req, file, cb) => {
          // Generate a random filename with the original extension.
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createApartmentDto: CreateApartmentDto,
    @Request() req,
  ) {
    // Assume you have an environment variable or config for your app’s base URL.
    const baseUrl = process.env.APP_URL || 'http://localhost:80';
    // Map each file to a public URL.
    const imageUrls = files.map(
      (file) => `${baseUrl}/uploads/apartments/${file.filename}`,
    );

    // Overwrite any "images" field with the newly generated URLs.
    createApartmentDto.images = imageUrls;

    // Attach the authenticated admin's user ID as the creator.
    (createApartmentDto as Partial<Apartment>).createdBy = req.user.id;

    return this.apartmentsService.create(createApartmentDto);
  }
}
