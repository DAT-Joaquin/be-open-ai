/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChairDocument = Chair & Document;

@Schema()
export class Chair {
  @Prop({ required: true, type: String, enum: ['NORMAL', 'VIP', 'DOUBLE'] })
  type: string;

  @Prop({ required: true, type: String, enum: ['2D', '3D'] })
  formatFilm: string;

  @Prop({ required: true })
  price: number;
}

export const ChairSchema = SchemaFactory.createForClass(Chair);
