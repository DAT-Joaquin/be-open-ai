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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../src/auth/guard/jwt-auth.guard';
import { User } from '../../src/utils/user.decorator';
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

  @ApiOperation({ summary: 'Đặt tiêu đề cho đoạn chat mới' })
  @Post('/create-title-for-new-chat')
  @HttpCode(HttpStatus.OK)
  createTitleForChat(@Body() body: CreateStartChatDto) {
    return this.chatCompletionService.createTitleForChat(body);
  }

  @ApiOperation({
    summary: 'Bắt đầu câu hỏi đầu tiên (câu hỏi mở đầu) của 1 đoạn chat mới',
  })
  @Post('/create-start-chat')
  @HttpCode(HttpStatus.OK)
  createNewStartChatAnonymous(@Body() body: CreateStartChatDto) {
    return this.chatCompletionService.createNewStartChat(body);
  }

  @ApiOperation({
    summary:
      'Tạo đoạn chat mới. Sau khi tạo đoạn chat mới thành công xong thì trả về id của đoạn chat đó',
  })
  @Post('/create-new-chat')
  @HttpCode(HttpStatus.OK)
  createNewChat(@Body() body: CreateNewChatDto, @User('_id') userId: string) {
    return this.chatCompletionService.createNewChat(body, userId);
  }
  @ApiOperation({
    summary: 'Tiếp tục đoạn chat',
  })
  @Post('/continue-chat')
  @HttpCode(HttpStatus.OK)
  continueChat(@Body() body: ContinueChatDto) {
    return this.chatCompletionService.continueChat(body);
  }

  @ApiOperation({
    summary: 'Lưu trữ đoạn chat',
  })
  @Post('/save-chat')
  @HttpCode(HttpStatus.OK)
  saveChat(@Body() body: SaveChatDto) {
    return this.chatCompletionService.saveChat(body);
  }

  @ApiOperation({
    summary: 'Lấy danh sách tất cả đoạn chat của user hiện tại',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-list-chat')
  getListChat(@User('_id') userId: string) {
    return this.chatCompletionService.getListChat(userId);
  }

  @ApiOperation({
    summary: 'Lấy danh sách tiêu đề của tất cả đoạn chat của user hiện tại',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-list-title-chat')
  getListTitleChat(@User('_id') userId: string) {
    return this.chatCompletionService.getListTitleChat(userId);
  }

  @ApiOperation({
    summary: 'Lấy nội dung chi tiết của đoạn chat',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-detail-chat/:id')
  getDetailChat(@Param('id') id: string) {
    return this.chatCompletionService.getDetailChat(id);
  }

  @ApiOperation({
    summary: 'Thay đổi tiêu đề của đoạn chat',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/rename-title-chat/:id')
  renameTitleChat(@Param('id') id: string, @Body() body: RenameTitleChatDto) {
    return this.chatCompletionService.renameTitleChat(id, body);
  }

  @ApiOperation({
    summary: 'Xoá một đoạn chat',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete-chat/:id')
  deleteChat(@Param('id') id: string) {
    return this.chatCompletionService.deleteChat(id);
  }
  @ApiOperation({
    summary: 'Xoá tất cả đoạn chat của user hiện tại',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete-all-chat')
  deleteAllChat(@User('_id') userId: string) {
    return this.chatCompletionService.deleteAllChat(userId);
  }
}
