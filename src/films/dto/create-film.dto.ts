import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ example: 'The Shaw shank Redemption', description: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '1994-01-01', description: 'Release date' })
  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;
}
