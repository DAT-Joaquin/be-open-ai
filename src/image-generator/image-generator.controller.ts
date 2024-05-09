import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
import {
  GenerateImageDto,
  QueryDeleteImageDto,
  QueryGetListImagesDto,
  SaveImageDto,
} from './dto/index.dto';
import { ImageGeneratorService } from './image-generator.service';

@ApiTags('Image Generator')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('image-generator')
export class ImageGeneratorController {
  constructor(private readonly imageGeneratorService: ImageGeneratorService) {}

  @ApiOperation({ summary: 'Generate 1 bức ảnh từ prompt' })
  @Post('')
  @HttpCode(HttpStatus.OK)
  generateImage(@Body() body: GenerateImageDto) {
    return this.imageGeneratorService.generateImage(body);
  }

  @ApiOperation({ summary: 'Lưu 1 bức ảnh' })
  @Post('/save')
  @HttpCode(HttpStatus.OK)
  saveImage(@Body() body: SaveImageDto, @User('_id') userId: string) {
    return this.imageGeneratorService.saveImage(body, userId);
  }

  @ApiOperation({ summary: 'Xoá 1 hoặc nhiều ảnh' })
  @Delete('')
  @HttpCode(HttpStatus.OK)
  deleteImages(@Query() query: QueryDeleteImageDto) {
    return this.imageGeneratorService.deleteImages(query);
  }

  @ApiOperation({ summary: 'Lấy danh sách ảnh' })
  @Get('')
  @HttpCode(HttpStatus.OK)
  getListImage(
    @User('_id') userId: string,
    @Query() query: QueryGetListImagesDto,
  ) {
    return this.imageGeneratorService.getListImage(userId, query);
  }

  @ApiOperation({ summary: 'Lấy chi tiết 1 ảnh' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDetailImage(@Param('id') id: string) {
    return this.imageGeneratorService.getDetailImage(id);
  }
}
