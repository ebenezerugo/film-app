import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { Film } from './entities/film.entity';
import { infinityPagination } from '../utils/infinity-pagination';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TApiResponse } from '../utils/types/api-response.type';
import { AddCommentDto } from './dto/add-comment.dto';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';

@ApiTags('Films')
@Controller({
  path: 'films',
  version: '1',
})
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create film',
    type: TApiResponse<Film>,
  })
  async create(@Body() createFilmDto: CreateFilmDto) {
    const film = await this.filmsService.create(createFilmDto);
    return TApiResponse.success(film);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<TApiResponse<InfinityPaginationResultType<Film>>> {
    if (limit > 50) {
      limit = 50;
    }
    return TApiResponse.success(
      infinityPagination(
        await this.filmsService.findAll({
          page,
          limit,
        }),
        { page, limit },
      ),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return TApiResponse.success(await this.filmsService.findOne({ id }));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return TApiResponse.success(
      await this.filmsService.update(id, updateFilmDto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return TApiResponse.success(await this.filmsService.remove(id));
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return TApiResponse.success(
      await this.filmsService.addComment(id, addCommentDto),
    );
  }

  @Get(':id/comments')
  @HttpCode(HttpStatus.OK)
  async findAllComments(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return TApiResponse.success(
      infinityPagination(
        await this.filmsService.findAllComments(id, {
          page,
          limit,
        }),
        { page, limit },
      ),
    );
  }
}
