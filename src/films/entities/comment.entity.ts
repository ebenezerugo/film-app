import { Column, Entity, ManyToOne } from 'typeorm';
import Model from '../../shared/entities/model.entity';
import { Film } from './film.entity';

@Entity()
export class Comment extends Model {
  @Column({ type: String, length: 400 })
  content: string;

  @ManyToOne(() => Film, (film) => film.comments)
  film: Film;
}
