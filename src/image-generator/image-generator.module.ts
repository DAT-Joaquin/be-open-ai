import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from '../openai/openai.module';
import { ImageGeneratorController } from './image-generator.controller';
import { ImageGeneratorService } from './image-generator.service';
import { ImageGeneratorSchema } from './model/image-generator';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ImageGenerator',
        schema: ImageGeneratorSchema,
      },
    ]),
    OpenaiModule,
  ],
  providers: [ImageGeneratorService],
  controllers: [ImageGeneratorController],
  exports: [ImageGeneratorService],
})
export class ImageGeneratorModule {}
