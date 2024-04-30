import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { JoinColumn } from 'typeorm';

@Entity({ name: 't_user_profile' })
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  // 关联字段
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
