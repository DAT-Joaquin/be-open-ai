import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatedResponse, getParamsPagination } from 'src/utils';
import {
  CreateFilmDto,
  QueryDeleteFilmDto,
  QueryGetListFilmDto,
} from './dto/index.dto';
import { FilmDocument } from './model/film.model';

@Injectable()
export class FilmService {
  constructor(
    @InjectModel('Film')
    private readonly FilmModel: Model<FilmDocument>,
  ) {}

  async getFilmList(query: QueryGetListFilmDto) {
    const limit = Number(query?.limit) || 10;
    const page = Number(query?.page) || 1;
    const { skip } = getParamsPagination({ page, limit });

    const { searchText, startDate, endDate, category, sort } = query;

    const condition = {};

    if (searchText) {
      condition['name'] = {
        $regex: searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
        $options: 'i',
      };
    }

    if (category) {
      condition['category'] = category;
    }

    if (startDate && endDate) {
      condition['startDate'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      condition['startDate'] = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      condition['startDate'] = {
        $lte: new Date(endDate),
      };
    }

    const total = await this.FilmModel.countDocuments(condition);

    try {
      const results = await this.FilmModel.find(condition)
        .sort({ startDate: sort === 1 ? 1 : -1 }) // 1: ASC, -1: DESC
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
          return result;
        }),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi lấy danh sách phim',
      };
    }
  }

  async getFilmById(id: string) {
    try {
      const film = await this.FilmModel.findById(id).lean().exec();

      if (!film) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tìm thấy phim',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        data: formatedResponse(film),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi lấy thông tin phim',
      };
    }
  }

  async createFilm(data: CreateFilmDto) {
    try {
      await this.FilmModel.create(data);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Thêm phim thành công',
      };
    } catch (error) {
      // Handle the error here
      console.error(error);

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi thêm phim',
      };
    }
  }

  async updateFilm(data: CreateFilmDto, id: string) {
    try {
      await this.FilmModel.findByIdAndUpdate(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật phim thành công',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi cập nhật phim',
      };
    }
  }

  async deleteFilm(query: QueryDeleteFilmDto) {
    try {
      await this.FilmModel.deleteMany({
        _id: { $in: query.ids },
      });
      return {
        message: 'Xóa phim thành công',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Lỗi khi xóa phim',
      };
    }
  }
}
