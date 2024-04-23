import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from '../auth/constants';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { FilmSchema } from './model/film.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Film',
        schema: FilmSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
