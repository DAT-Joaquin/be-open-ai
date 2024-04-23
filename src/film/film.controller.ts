import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.decorator';
import { Auth } from 'src/utils/auth.decorator';
import {
  CreateFilmDto,
  QueryDeleteFilmDto,
  QueryGetListFilmDto,
} from './dto/index.dto';
import { FilmService } from './film.service';

@ApiTags('Film')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @ApiBearerAuth()
@Controller({
  path: 'film',
  version: '1',
})
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getListFilm(@Query() query: QueryGetListFilmDto) {
    return this.filmService.getFilmList(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getFilmById(@Param('id') id: string) {
    return this.filmService.getFilmById(id);
  }

  @Auth()
  @Role('admin')
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createFilm(@Body() body: CreateFilmDto) {
    return this.filmService.createFilm(body);
  }

  @Auth()
  @Role('admin')
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateFilm(@Body() body: CreateFilmDto, @Param('id') id: string) {
    return this.filmService.updateFilm(body, id);
  }

  @Auth()
  @Role('admin')
  @Delete('')
  @HttpCode(HttpStatus.OK)
  deleteFilm(@Query() query: QueryDeleteFilmDto) {
    return this.filmService.deleteFilm(query);
  }
}
