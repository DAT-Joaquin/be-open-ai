/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ChatCompletionDocument = ChatCompletion & Document;

@Schema()
export class ChatCompletion {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Array })
  messages: object[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false, ref: 'User', type: MongooseSchema.Types.ObjectId })
  userId: string;
}

export const ChatCompletionSchema =
  SchemaFactory.createForClass(ChatCompletion);
