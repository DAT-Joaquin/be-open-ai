/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ImageGeneratorDocument = ImageGenerator & Document;

@Schema()
export class ImageGenerator {
  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true, ref: 'User', type: MongooseSchema.Types.ObjectId })
  userId: string;
}

export const ImageGeneratorSchema =
  SchemaFactory.createForClass(ImageGenerator);
