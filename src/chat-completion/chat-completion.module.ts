import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from './../openai/openai.module';
import { ChatCompletionController } from './chat-completion.controller';
import { ChatCompletionService } from './chat-completion.service';
import { ChatCompletionSchema } from './model/chat-completion.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ChatCompletion',
        schema: ChatCompletionSchema,
      },
    ]),
    OpenaiModule,
  ],
  providers: [ChatCompletionService],
  controllers: [ChatCompletionController],
  exports: [ChatCompletionService],
})
export class ChatCompletionModule {}
