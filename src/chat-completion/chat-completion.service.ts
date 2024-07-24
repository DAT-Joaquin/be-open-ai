import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from '../openai/openai.service';
import { formatedResponse } from '../utils';
import {
  ContinueChatDto,
  CreateStartChatDto,
  RegenerateChatDto,
  RenameTitleChatDto,
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

  // async createTitleForChat(body: CreateStartChatDto) {
  //   return this.openAIService.chatGptRequest(
  //     `Đặt ý chính thật ngắn gọn, độ dài không quá 30 ký tự cho câu văn sau: ${body.prompt}. `,
  //     [],
  //     true,
  //   );
  // }

  async createNewChatPublic(body: CreateStartChatDto) {
    let _result = '';
    let id = '';
    try {
      const [result, { _id }] = await Promise.all([
        this.openAIService.chatGptRequest(body.prompt, []),
        this.ChatCompletionModel.create({
          createdAt: new Date(),
        }),
      ]);

      _result = result;
      id = _id;

      return {
        result,
        id: _id,
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      setImmediate(async () => {
        try {
          const chat = await this.ChatCompletionModel.findById(id);
          if (!chat) {
            console.error('Chat not found');
          } else {
            const messages = [
              { text: body.prompt, ai: false },
              { text: _result, ai: true },
            ];
            await chat.updateOne({ messages });
          }
        } catch (err) {
          console.error('Error in finally block:', err);
        }
      });
    }

    // return this.openAIService.chatGptRequest(body.prompt, []);
  }

  async createEmptyNewChat(userId: string) {
    try {
      // const [order, { _id }] = await Promise.all([
      //   this.ChatCompletionModel.countDocuments({
      //     userId,
      //   }),
      //   this.ChatCompletionModel.create({
      //     createdAt: new Date(),
      //     userId,
      //   }),
      // ]);
      const orderOfNewChat = await this.ChatCompletionModel.countDocuments({
        userId,
      });
      const chat = await this.ChatCompletionModel.create({
        createdAt: new Date(),
        userId,
        title: `New chat ${orderOfNewChat + 1}`,
      });

      return {
        id: chat._id,
      };
      // return {
      //   id: _id,
      //   title: `New chat ${order + 1}`,
      // };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createNewChat(body: CreateStartChatDto, userId?: string) {
    // console.log('userID', userId);
    let _title = '';
    let _result = '';
    let id = '';
    try {
      const [title, result, { _id }] = await Promise.all([
        this.openAIService.chatGptRequest(
          `Đặt ý chính thật ngắn gọn, độ dài không quá 30 ký tự cho câu văn sau: ${body.prompt}. `,
          [],
          true,
        ),
        this.openAIService.chatGptRequest(body.prompt, []),
        this.ChatCompletionModel.create({
          createdAt: new Date(),
          userId,
        }),
      ]);
      // _title = 'New chat ' + Math.floor(Math.random() * 1000) + 1;
      _title = title;
      _result = result;
      id = _id;

      return {
        title,
        result,
        id: _id,
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      setImmediate(async () => {
        try {
          const chat = await this.ChatCompletionModel.findById(id);
          if (!chat) {
            console.error('Chat not found');
          } else {
            const messages = [
              { text: body.prompt, ai: false },
              { text: _result, ai: true },
            ];
            await chat.updateOne({ messages, title: _title });
          }
        } catch (err) {
          console.error('Error in finally block:', err);
        }
      });
    }

    // return this.openAIService.chatGptRequest(body.prompt, []);
  }

  async continueChat(body: ContinueChatDto) {
    let result: any;
    let messages: any;
    try {
      const chat = await this.ChatCompletionModel.findById(body.id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      } else {
        messages = chat.messages;

        result = await this.openAIService.chatGptRequest(
          body.prompt,
          messages as Message[],
        );

        return {
          result,
        };
      }
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      setImmediate(async () => {
        try {
          await this.ChatCompletionModel.updateOne(
            { _id: body.id },
            {
              messages: [
                ...messages,
                { text: body.prompt, ai: false },
                { text: result, ai: true },
              ],
            },
          );
        } catch (err) {
          console.error('Error in finally block:', err);
        }
      });
    }
  }

  async regenerateChat(body: RegenerateChatDto) {
    let result: any;
    let messages: any;
    try {
      const chat = await this.ChatCompletionModel.findById(body.id);
      if (!chat) {
        throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
      } else {
        messages = chat.messages;

        messages.pop();
        messages.pop();

        // await chat.updateOne({ messages });

        result = await this.openAIService.chatGptRequest(
          body.prompt,
          messages as Message[],
        );
        return {
          result,
        };
      }
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      setImmediate(async () => {
        try {
          await this.ChatCompletionModel.updateOne(
            { _id: body.id },
            {
              messages: [
                ...messages,
                { text: body.prompt, ai: false },
                { text: result, ai: true },
              ],
            },
          );
        } catch (err) {
          console.error('Error in finally block:', err);
        }
      });
    }
  }

  // async createNewChat(body: CreateNewChatDto, userId?: string) {
  //   try {
  //     const messages = [
  //       {
  //         text: body.firstQuestion,
  //         ai: false,
  //       },
  //       {
  //         text: body.firstAnswer,
  //         ai: true,
  //       },
  //     ];

  //     const newChat = await this.ChatCompletionModel.create({
  //       title: body.title,
  //       messages,
  //       createdAt: new Date(),
  //       userId,
  //     });
  //     return {
  //       _id: newChat._id,
  //     };
  //   } catch (err) {
  //     throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // async saveChat(body: SaveChatDto) {
  //   try {
  //     const chat = await this.ChatCompletionModel.findById(body.id);
  //     if (!chat) {
  //       throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
  //     } else {
  //       let messages = chat.messages;
  //       messages = [
  //         ...messages,
  //         { text: body.question, ai: false },
  //         { text: body.answer, ai: true },
  //       ];
  //       await chat.updateOne({ messages });
  //       return {
  //         message: 'Save successfully',
  //       };
  //     }
  //   } catch (err) {
  //     throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async getListChat(userId: string) {
    try {
      const chats = await this.ChatCompletionModel.find({ userId });
      return {
        data: chats
          ?.filter((item) => item?.title)
          ?.map((item) => formatedResponse(item)),
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListTitleChat(userId: string) {
    try {
      const chats = await this.ChatCompletionModel.find({ userId }).sort({
        createdAt: -1, // Sort by createdAt in descending order
      });
      return {
        data: chats
          ?.filter((item) => item?.title)
          ?.map((item) => ({
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
      // chat {
      //   _id: new ObjectId("6656ecc3857011918785c716"),
      //   createdAt: 2024-05-29T08:52:19.970Z,
      //   userId: new ObjectId("66554e98c0eb5b6100936e9a"),
      //   __v: 0,
      //   messages: [
      //     { text: 'Ban o dau', ai: false },
      //     {
      //       text: '<p>Đây là một câu hỏi mở và không rõ ràng. Bạn có thể cung cấp thêm thông tin để chúng tôi có thể giúp bạn tốt hơn không?</p>',
      //       ai: true
      //     }
      //   ],
      //   title: 'Bạn ở đâu?'
      // }
      return {
        data: {
          // id: chat._id,
          createdAt: chat.createdAt,
          messages: chat.messages,
          title: chat.title,
        },
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
