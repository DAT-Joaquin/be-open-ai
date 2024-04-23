import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatedResponse } from 'src/utils';
import { CreateChairDto, QueryDeleteChairDto } from './dto/index.dto';
import { ChairDocument } from './model/chair.model';

@Injectable()
export class ChairService {
  constructor(
    @InjectModel('Chair')
    private readonly ChairModel: Model<ChairDocument>,
  ) {}

  async createChair(data: CreateChairDto) {
    try {
      await this.ChairModel.create(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Thêm ghế thành công',
      };
    } catch (error) {
      // Handle the error here
      console.error(error);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi thêm ghế',
      };
    }
  }

  async getListChair() {
    try {
      const listChair = await this.ChairModel.find().exec();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách ghế thành công',
        data: listChair.map((item: any) => {
          const result: any = formatedResponse(item);
          return result;
        }),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi lấy danh sách ghế',
      };
    }
  }

  async deleteChair(query: QueryDeleteChairDto) {
    try {
      await this.ChairModel.deleteMany({
        _id: { $in: query.ids },
      });
      return {
        message: 'Xóa ghế thành công',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi xóa ghế',
      };
    }
  }
}
