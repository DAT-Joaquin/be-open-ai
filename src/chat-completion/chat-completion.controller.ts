import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/utils/user.decorator';
import { ChatCompletionService } from './chat-completion.service';
import {
  ContinueChatDto,
  CreateNewChatDto,
  CreateStartChatDto,
  RenameTitleChatDto,
  SaveChatDto,
} from './dto/index.dto';

@ApiTags('Chat Completion')
@Controller('chat-completion')
export class ChatCompletionController {
  constructor(private readonly chatCompletionService: ChatCompletionService) {}

  @Post('/create-start-chat')
  @HttpCode(HttpStatus.OK)
  createNewStartChatAnonymous(@Body() body: CreateStartChatDto) {
    return this.chatCompletionService.createNewStartChat(body);
  }

  @Post('/create-title-for-new-chat')
  @HttpCode(HttpStatus.OK)
  createTitleForChat(@Body() body: CreateStartChatDto) {
    return this.chatCompletionService.createTitleForChat(body);
  }

  @Post('/create-new-chat')
  @HttpCode(HttpStatus.OK)
  createNewChat(@Body() body: CreateNewChatDto, @User('_id') userId: string) {
    return this.chatCompletionService.createNewChat(body, userId);
  }

  @Post('/continue-chat')
  @HttpCode(HttpStatus.OK)
  continueChat(@Body() body: ContinueChatDto) {
    return this.chatCompletionService.continueChat(body);
  }

  @Post('/save-chat')
  @HttpCode(HttpStatus.OK)
  saveChat(@Body() body: SaveChatDto) {
    return this.chatCompletionService.saveChat(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-list-chat')
  getListChat(@User('_id') userId: string) {
    return this.chatCompletionService.getListChat(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-list-title-chat')
  getListTitleChat(@User('_id') userId: string) {
    return this.chatCompletionService.getListTitleChat(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-detail-chat/:id')
  getDetailChat(@Param('id') id: string) {
    return this.chatCompletionService.getDetailChat(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/rename-title-chat/:id')
  renameTitleChat(@Param('id') id: string, @Body() body: RenameTitleChatDto) {
    return this.chatCompletionService.renameTitleChat(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete-chat/:id')
  deleteChat(@Param('id') id: string) {
    return this.chatCompletionService.deleteChat(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete-all-chat')
  deleteAllChat(@User('_id') userId: string) {
    return this.chatCompletionService.deleteAllChat(userId);
  }
}
