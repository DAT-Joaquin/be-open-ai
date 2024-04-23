/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  telephone: string;

  @Prop({ required: false })
  birthday: Date;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false, default: 0 })
  pointReward: number;

  @Prop({ required: false })
  province: string;

  @Prop({ required: false })
  district: string;

  @Prop({ required: false })
  ward: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: true, default: 'user' })
  role: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
