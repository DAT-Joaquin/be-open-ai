import { Module } from '@nestjs/common';
import { ChatCompletionController } from './chat-completion.controller';
import { ChatCompletionService } from './chat-completion.service';

@Module({
  providers: [ChatCompletionService],
  controllers: [ChatCompletionController],
})
export class ChatCompletionModule {}
