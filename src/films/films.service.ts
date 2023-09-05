import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Comment } from './entities/comment.entity';
import { DeepPartial, Repository } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';
import { AddCommentDto } from "./dto/add-comment.dto";

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  create(createFilmDto: CreateFilmDto) {
    const film = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(film);
  }

  findAll(paginationOptions: IPaginationOptions): Promise<Film[]> {
    return this.filmRepository
      .createQueryBuilder('film')
      .loadRelationCountAndMap('film.numberOfComments', 'film.comments')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .orderBy('film.releaseDate', 'ASC')
      .getMany();
    // return this.filmRepository.find({
    //   skip: (paginationOptions.page - 1) * paginationOptions.limit,
    //   take: paginationOptions.limit,
    //   order: { releaseDate: 'ASC' },
    // });
  }

  findOne(fields: EntityCondition<Film>): Promise<NullableType<Film>> {
    return this.filmRepository.findOne({
      where: fields,
      relations: ['comments'],
    });
  }

  update(id: string, payload: DeepPartial<Film>) {
    return this.filmRepository.update(id, payload);
  }

  remove(id: string) {
    return this.filmRepository.softDelete(id);
  }

  async addComment(id: string, payload: AddCommentDto) {
    const film = await this.filmRepository.findOne({ where: { id } });
    const comment = this.commentRepository.create(payload);
    comment.film = film;
    return this.commentRepository.save(comment);
  }

  async findAllComments(id: string, paginationOptions: IPaginationOptions) {
    return this.commentRepository.find({
      where: { film: { id } },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: { createdAt: 'ASC' },
    });
  }
}
