import { Column, Entity, OneToMany } from 'typeorm';
import Model from '../../shared/entities/model.entity';
import { Comment } from './comment.entity';

@Entity()
export class Film extends Model {
  @Column({ type: String })
  title: string;

  @Column({ type: String })
  releaseDate: Date;

  @OneToMany(() => Comment, (comment) => comment.film)
  comments: Comment[];

  numberOfComments: number;
}
