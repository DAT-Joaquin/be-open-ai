import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStartChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  prompt: string;
}

export class CreateNewChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  title: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  firstQuestion: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  firstAnswer: string;
}

export class SaveChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  question: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  answer: string;
}

export class ContinueChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  prompt: string;
}

export class RenameTitleChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  title: string;
}

export class RegenerateChatDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  prompt: string;
}

export class CreateNewChatResponse {
  @ApiProperty({
    example: 'Yêu cầu giúp đỡ.',
  })
  title: string;

  @ApiProperty({
    example: 'Vâng. Tôi rất sẵn lòng giúp đỡ bạn. Câu hỏi của bạn là gì vậy?',
  })
  result: object;

  @ApiProperty({
    example: 'abc123werdsg34523',
  })
  id: string;
}
