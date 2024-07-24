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
    // const listImage = [
    //   'https://static.vecteezy.com/system/resources/previews/027/491/621/non_2x/doraemon-illustration-free-vector.jpg',
    //   'https://thumbs.dreamstime.com/b/doraemon-tokoh-robot-kucing-karakter-fiksi-dalam-serial-kartun-anime-di-jepang-266923243.jpg',
    //   'https://laz-img-sg.alicdn.com/p/a9c97a082efe5ffb5aba747a045c259f.jpg',
    //   'https://i.pinimg.com/736x/bf/eb/a8/bfeba832a872fef7b0426e3c314041d9.jpg',
    //   'https://images.toplist.vn/images/800px/nhung-thanh-tich-bat-hu-cua-nobita-583176.jpg',
    //   'https://bizweb.dktcdn.net/thumb/1024x1024/100/253/478/products/179322349-837413886822614-1295652114930682872-n.jpg?v=1626851860270',
    //   'https://qph.cf2.quoracdn.net/main-qimg-284df7f935d898beb05f222a581ba8ad-lq',
    //   'https://w7.pngwing.com/pngs/750/591/png-transparent-doraemon-character-illustration-doraemon-g%C5%8Dda-takeshi-character-nobita-nobi-doraemon-child-hand-people.png',
    //   'https://photosnow.org/wp-content/uploads/2024/04/doraemon-nobita-photo_21.jpg',
    //   'https://product.hstatic.net/1000231532/product/tomica_ania_nobita___kyu_-_doraemon_nobita_s_new_dinosaur_0d40439215584951b5ec9f24b94e92a1_grande.jpg',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx0GhJZQyiwS25dCh9vKPeov7Hhg122n83ow&s',
    // ];
    // const url = listImage[Math.floor(Math.random() * listImage.length)];
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

  async getDetailImage(id: string) {
    try {
      const image = await this.ImageGeneratorModel.findById(id);
      if (!image) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }
      const data = formatedResponse(image);
      delete data.userId;
      return {
        data,
      };
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
