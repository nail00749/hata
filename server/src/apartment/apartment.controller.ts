import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Public } from '../decotarors/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  /*@UseInterceptors(AnyFilesInterceptor())*/
  async create(@Req() req, @Body() createApartmentDto: CreateApartmentDto, /*@UploadedFiles() files: Array<Express.Multer.File>*/) {
    console.log(createApartmentDto);
    //return this.apartmentService.create(createApartmentDto, req.user);
    return null
  }

  @UseGuards(JwtAuthGuard)
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
