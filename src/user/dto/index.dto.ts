import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TypeUseEnum {
  AI_ART = 'AI_ART',
  ENHANCE = 'ENHANCE',
  REMOVE_BACKGROUND = 'REMOVE_BACKGROUND',
  CROP = 'CROP',
}

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  password: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  telephone: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  province: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  district: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  ward: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  address: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsDateString()
  @Expose()
  birthday: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  gender: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  redirectUrl: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  firstName: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  lastName: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  avatar: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  telephone: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  province: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  district: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  ward: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @Expose()
  address: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsDateString()
  @Expose()
  birthday: string;
}

export class QueryTypeUseDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    enum: TypeUseEnum,
    enumName: 'TypeUseEnum',
  })
  @IsEnum(TypeUseEnum)
  @Expose()
  type: TypeUseEnum;
}
