import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from '../openai/openai.service';
import { formatedResponse, getParamsPagination } from '../utils';
import {
  GenerateImageDto,
  QueryDeleteImageDto,
  QueryGetListImagesDto,
  SaveImageDto,
  SortDateEnum,
} from './dto/index.dto';
import { ImageGeneratorDocument } from './model/image-generator';

@Injectable()
export class ImageGeneratorService {
  constructor(
    @InjectModel('ImageGenerator')
    private readonly ImageGeneratorModel: Model<ImageGeneratorDocument>,
    private readonly openAIService: OpenAIService,
  ) {}

  async generateImage(body: GenerateImageDto) {
    const url = await this.openAIService.generateImage(body.prompt, body.size);
    return {
      url,
    };
  }

  async saveImage(body: SaveImageDto, userId: string) {
    try {
      await this.ImageGeneratorModel.create({
        ...body,
        userId,
        createdAt: new Date(),
      });
      return {
        message: 'Image saved successfully',
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteImages(query: QueryDeleteImageDto) {
    try {
      await this.ImageGeneratorModel.deleteMany({
        _id: { $in: query.idArr },
      });
      return {
        message: 'Delete successfully',
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListImage(userId: string, query: QueryGetListImagesDto) {
    const limit = Number(query?.limit) || 10;
    const page = Number(query?.page) || 1;
    const { skip } = getParamsPagination({ page, limit });

    const sort: any = {};
    if (query.sortDate === SortDateEnum.DECREASE) {
      sort.createdAt = -1;
    } else if (query.sortDate === SortDateEnum.INCREASE) {
      sort.createdAt = 1;
    }

    const total = await this.ImageGeneratorModel.countDocuments({ userId });

    const results = await this.ImageGeneratorModel.find({ userId })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    return {
      page,
      limit,
      total,
      data: results.map((item: any) => {
        const result: any = formatedResponse(item);
        delete result.userId;
        return result;
      }),
    };
  }
}
