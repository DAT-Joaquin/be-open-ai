/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, enum: ['P', 'K', 'T13', 'T16', 'T18'] })
  classify: string;

  @Prop({ required: true, type: Array })
  format: string[];

  @Prop({ required: true, type: Array })
  actor: string[];

  @Prop({ required: true })
  director: string;

  @Prop({
    required: true,
    type: String,
    enum: [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Horror',
      'Science Fiction',
      'Thriller',
      'Romance',
      'Fantasy',
      'Animation',
      'Mystery',
      'Crime',
      'Biography',
      'Musical',
      'War',
    ],
  })
  category: string;

  @Prop({ required: true, type: Array })
  language: string[];

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  startDateSpecial: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  linkTrailer: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ required: true, default: false })
  stopShowing: boolean;

  @Prop({ required: true, default: false })
  hotFilm: boolean;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
