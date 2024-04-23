import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateFilmDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  classify: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsArray()
  @Expose()
  format: string[];

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  director: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  category: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsArray()
  @Expose()
  language: string[];

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsDateString()
  @Expose()
  startDate: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  @Expose()
  startDateSpecial: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsNumber()
  @Expose()
  duration: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  description: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  linkTrailer: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  coverImage: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsBoolean()
  @Expose()
  hotFilm: boolean;
}

export class QueryDeleteFilmDto {
  @ApiProperty()
  @IsNotEmpty()
  // @IsArray()
  @Expose()
  ids: string[];
}

export enum SortDateEnum {
  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',
  DEFAULT = 'DEFAULT',
}

export enum CategoryFilmEnum {
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Horror = 'Horror',
  ScienceFiction = 'Science Fiction',
  Thriller = 'Thriller',
  Romance = 'Romance',
  Fantasy = 'Fantasy',
  Animation = 'Animation',
  Mystery = 'Mystery',
  Crime = 'Crime',
  Biography = 'Biography',
  Musical = 'Musical',
  War = 'War',
}

export class QueryGetListFilmDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @Transform(({ value }) => Number(value))
  @Expose()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  // @Transform(({ value }) => Number(value))
  @Expose()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  searchText: string;

  @ApiPropertyOptional({
    enum: CategoryFilmEnum,
    enumName: 'CategoryFilmEnum',
  })
  @IsOptional()
  @IsEnum(CategoryFilmEnum)
  @Expose()
  category: CategoryFilmEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Expose()
  startDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Expose()
  endDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  sort: number;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsArray()
  // @Expose()
  // format:
}
