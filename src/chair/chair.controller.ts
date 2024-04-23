import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.decorator';
import { Auth } from 'src/utils/auth.decorator';
import { ChairService } from './chair.service';
import { CreateChairDto, QueryDeleteChairDto } from './dto/index.dto';

@ApiTags('Chair')
@Auth()
@Role('admin')
@Controller({
  path: 'chair',
  version: '1',
})
export class ChairController {
  constructor(private readonly chairService: ChairService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getListChair() {
    return this.chairService.getListChair();
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createFilm(@Body() body: CreateChairDto) {
    return this.chairService.createChair(body);
  }

  @Delete('')
  @HttpCode(HttpStatus.OK)
  deleteFilm(@Query() query: QueryDeleteChairDto) {
    return this.chairService.deleteChair(query);
  }
}
