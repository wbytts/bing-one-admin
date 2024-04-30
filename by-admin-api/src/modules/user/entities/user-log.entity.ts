import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 't_user_log' })
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  result: string;

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn({ name: 'user_id' }) // 这个其实可以不加
  user: User;
}
