import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from '../openai/openai.service';
import { formatedResponse } from '../utils';
import {
  ContinueChatDto,
  CreateNewChatDto,
  CreateStartChatDto,
  RegenerateChatDto,
  RenameTitleChatDto,
  SaveChatDto,
} from './dto/index.dto';
import { ChatCompletionDocument } from './model/chat-completion.model';

type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

@Injectable()
export class ChatCompletionService {
  constructor(
    @InjectModel('ChatCompletion')
    private readonly ChatCompletionModel: Model<ChatCompletionDocument>,
    private readonly openAIService: OpenAIService,
  ) {}

  async createTitleForChat(body: CreateStartChatDto) {
    return this.openAIService.chatGptRequest(
      `Đặt ý chính thật ngắn gọn, độ dài không quá 30 ký tự cho câu văn sau: ${body.prompt}. `,
      [],
      true,
    );
  }

  async createNewStartChat(body: CreateStartChatDto) {
    return this.openAIService.chatGptRequest(body.prompt, []);
  }

  async continueChat(body: ContinueChatDto) {
    try {
      const chat = await this.ChatCompletionModel.findById(body.id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      } else {
        const messages = chat.messages;

        return this.openAIService.chatGptRequest(
          body.prompt,
          messages as Message[],
        );
      }
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async regenerateChat(body: RegenerateChatDto) {
    try {
      const chat = await this.ChatCompletionModel.findById(body.id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      } else {
        const messages = chat.messages;

        messages.pop();
        messages.pop();

        await chat.updateOne({ messages });

        return this.openAIService.chatGptRequest(
          body.prompt,
          messages as Message[],
        );
      }
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNewChat(body: CreateNewChatDto, userId?: string) {
    try {
      const messages = [
        {
          text: body.firstQuestion,
          ai: false,
        },
        {
          text: body.firstAnswer,
          ai: true,
        },
      ];

      const newChat = await this.ChatCompletionModel.create({
        title: body.title,
        messages,
        createdAt: new Date(),
        userId,
      });
      return {
        _id: newChat._id,
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async saveChat(body: SaveChatDto) {
    try {
      const chat = await this.ChatCompletionModel.findById(body.id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      } else {
        let messages = chat.messages;
        messages = [
          ...messages,
          { text: body.question, ai: false },
          { text: body.answer, ai: true },
        ];
        await chat.updateOne({ messages });
        return {
          message: 'Save successfully',
        };
      }
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListChat(userId: string) {
    try {
      const chats = await this.ChatCompletionModel.find({ userId });
      return {
        data: chats?.map((item) => formatedResponse(item)),
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListTitleChat(userId: string) {
    try {
      const chats = await this.ChatCompletionModel.find({ userId });
      return {
        data: chats?.map((item) => ({
          id: item._id,
          title: item.title,
        })),
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDetailChat(id: string) {
    try {
      const chat = await this.ChatCompletionModel.findById(id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      }
      return {
        data: formatedResponse(chat),
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async renameTitleChat(id: string, body: RenameTitleChatDto) {
    try {
      await this.ChatCompletionModel.updateOne(
        { _id: id },
        { title: body.title },
      );
      return {
        message: 'Rename title successfully',
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteChat(id: string) {
    try {
      await this.ChatCompletionModel.deleteOne({ _id: id });
      return {
        message: 'Delete successfully',
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAllChat(userId: string) {
    try {
      await this.ChatCompletionModel.deleteMany({ userId });
      return {
        message: 'Delete all successfully',
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
