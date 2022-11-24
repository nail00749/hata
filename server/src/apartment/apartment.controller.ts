import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles, Res, Query,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Public } from '../decotarors/public.decorator';
import { diskStorage } from 'multer';
import { ParseFromObject } from '../pipes/ParseFromObject';
import { FileMultipleInterceptor } from '../interceptors/FileMultipleInterceptor';
import { RequestWithUser } from '../models/RequestWithUser.interface';
import { editFileName } from '../utils/editFileName';
import { FastifyReply } from 'fastify';
import { ApartmentQueryDto } from '../dtos/apartmentQuery.dto';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {
  }

  @Post()
  @UseInterceptors(FileMultipleInterceptor('images', 10, {
    storage: diskStorage({
      destination: 'dist/./src/static',
      filename: editFileName,
    }),
  }))
  async create(@Req() request: RequestWithUser,
               @Body(new ParseFromObject<CreateApartmentDto>({ fields: ['coordinates'] }))
                 createApartmentDto: CreateApartmentDto,
               @UploadedFiles() files: Express.Multer.File[],
               @Res() reply: FastifyReply,
  ) {
    await this.apartmentService.create(createApartmentDto, request.user, files);
    reply.status(201);
  }

  @Get()
  @Public()
  findAll(@Query() queryLimitDto: ApartmentQueryDto) {
    return this.apartmentService.findAll(queryLimitDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(id);
  }

  @Get('update/:id')
  findOneForUpdate(@Param('id') id: string) {
    return this.apartmentService.findOneForUpdate(id);
  }

  @Get('my')
  findMyApartments(@Req() request: RequestWithUser) {
    return this.apartmentService.findMyApartments(request.user);
  }

  @UseInterceptors(FileMultipleInterceptor('images', 10, {
    storage: diskStorage({
      destination: 'dist/./src/static',
      filename: editFileName,
    }),
  }))
  @Patch(':id')
  update(@Param('id') id: string,
         @Body() updateApartmentDto: UpdateApartmentDto,
         @UploadedFiles() files: Express.Multer.File[]) {
    return this.apartmentService.update(id, updateApartmentDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(id);
  }
}
