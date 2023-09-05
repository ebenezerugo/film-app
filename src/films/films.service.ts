import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Comment } from './entities/comment.entity';
import { DeepPartial, Repository } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  create(createFilmDto: CreateFilmDto) {
    try {
      this.logger.log('Creating new film');
      const film = this.filmRepository.create(createFilmDto);
      return this.filmRepository.save(film);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Film[]> {
    try {
      this.logger.log('Finding all films');
      return this.filmRepository
        .createQueryBuilder('film')
        .loadRelationCountAndMap('film.numberOfComments', 'film.comments')
        .skip((paginationOptions.page - 1) * paginationOptions.limit)
        .take(paginationOptions.limit)
        .orderBy('film.releaseDate', 'ASC')
        .getMany();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(fields: EntityCondition<Film>): Promise<NullableType<Film>> {
    try {
      this.logger.log('Finding film');
      return this.filmRepository.findOne({
        where: fields,
        relations: ['comments'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: string, payload: DeepPartial<Film>) {
    try {
      this.logger.log('Updating film');
      return this.filmRepository.update(id, payload);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: string) {
    try {
      this.logger.log('Deleting film');
      return this.filmRepository.softDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addComment(id: string, payload: AddCommentDto) {
    try {
      this.logger.log('Adding comment to film');
      const film = await this.filmRepository.findOne({ where: { id } });
      const comment = this.commentRepository.create(payload);
      comment.film = film;
      return this.commentRepository.save(comment);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllComments(id: string, paginationOptions: IPaginationOptions) {
    try {
      this.logger.log('Finding all comments');
      return this.commentRepository.find({
        where: { film: { id } },
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        order: { createdAt: 'ASC' },
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            body: error.message,
          },
          message: 'Error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
