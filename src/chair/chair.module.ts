import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from '../auth/constants';
import { ChairController } from './chair.controller';
import { ChairService } from './chair.service';
import { ChairSchema } from './model/chair.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Chair',
        schema: ChairSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ChairController],
  providers: [ChairService],
  exports: [ChairService],
})
export class ChairModule {}
