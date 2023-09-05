import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddCommentDto {
  @ApiProperty({ example: 'Nice movie', description: 'Comment' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  content: string;
}
