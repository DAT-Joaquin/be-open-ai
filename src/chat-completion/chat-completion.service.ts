import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from 'src/openai/openai.service';
import { CreateNewChatAnonymousDto } from './dto/index.dto';
import { ChatCompletionDocument } from './model/chat-completion.model';

@Injectable()
export class ChatCompletionService {
  constructor(
    @InjectModel('ChatCompletion')
    private readonly ChatCompletionModel: Model<ChatCompletionDocument>,
    private readonly openAIService: OpenAIService,
  ) {}

  async createNewChatAnonymous(body: CreateNewChatAnonymousDto) {
    return this.openAIService.chatGptRequest(body.prompt, []);
  }
}
