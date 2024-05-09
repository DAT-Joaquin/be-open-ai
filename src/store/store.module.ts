import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from '../s3/s3.module';
import { StoreSchema } from './model/store.model';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Store',
        schema: StoreSchema,
      },
    ]),
    S3Module,
    ConfigModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
