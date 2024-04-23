import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateChairDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  type: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  formatFilm: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsNumber()
  @Expose()
  price: number;
}

export class QueryDeleteChairDto {
  @ApiProperty()
  @IsNotEmpty()
  // @IsArray()
  @Expose()
  ids: string[];
}
