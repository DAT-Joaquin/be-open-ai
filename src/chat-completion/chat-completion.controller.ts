import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatCompletionService } from './chat-completion.service';
import { CreateNewChatAnonymousDto } from './dto/index.dto';

@ApiTags('Chat Completion')
@Controller('chat-completion')
export class ChatCompletionController {
  constructor(private readonly chatCompletionService: ChatCompletionService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  createNewChatAnonymous(@Body() body: CreateNewChatAnonymousDto) {
    return this.chatCompletionService.createNewChatAnonymous(body);
  }
}
