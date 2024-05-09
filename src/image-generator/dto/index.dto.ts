import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SizeImageEnum {
  '256x256' = '256x256',
  '512x512' = '512x512',
  '1024x1024' = '1024x1024',
}

export class GenerateImageDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  prompt: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: SizeImageEnum,
    enumName: 'SizeImageEnum',
  })
  @IsEnum(SizeImageEnum)
  @Expose()
  size: SizeImageEnum;
}

export class SaveImageDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  prompt: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  size: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  url: string;
}

export class QueryDeleteImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  idArr: string[];
}

export enum SortDateEnum {
  DECREASE = 'DECREASE',
  INCREASE = 'INCREASE',
  DEFAULT = 'DEFAULT',
}

export class QueryGetListImagesDto {
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

  @ApiPropertyOptional({
    enum: SortDateEnum,
    enumName: 'SortDateEnum',
  })
  @IsOptional()
  @IsEnum(SortDateEnum)
  @Expose()
  sortDate: SortDateEnum;
}
