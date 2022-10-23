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
  UploadedFiles, Res,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Public } from '../decotarors/public.decorator';
import { diskStorage } from 'multer';
import { ParseFromObject } from '../pipes/ParseFromObject';
import { FileMultipleInterceptor } from '../interceptors/FileMultipleInterceptor';
import { RequestWithUserInterface } from '../models/RequestWithUser.interface';
import { editFileName } from '../utils/editFileName';
import { FastifyReply } from 'fastify';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {
  }

  @Post()
  @UseInterceptors(FileMultipleInterceptor('images', 10, {
    storage: diskStorage({
      destination: './src/static',
      filename: editFileName
    }),
  }))
  async create(@Req() req: RequestWithUserInterface,
               @Body(new ParseFromObject<CreateApartmentDto>({ fields: ['coordinates'] }))
                 createApartmentDto: CreateApartmentDto,
               @UploadedFiles() files: Express.Multer.File[],
               @Res() reply: FastifyReply
               ) {
    await this.apartmentService.create(createApartmentDto, req.user, files);
    reply.status(201)
  }

  @Get()
  findAll() {
    return this.apartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentService.update(+id, updateApartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(+id);
  }
}
