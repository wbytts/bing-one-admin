import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { UserProfile } from './user-profile.entity';
import { UserLog } from './user-log.entity';

@Entity({ name: 't_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 50, comment: '用户名' })
  name: string;

  @Column({ name: 'password', length: 50, comment: '密码' })
  password: string;

  @Column({ name: 'email', length: 80, comment: '邮箱' })
  email: string;

  @Column({ name: 'phone', length: 20, comment: '手机号' })
  phone: string;

  @Column({ name: 'sex', length: 5, comment: '性别' })
  sex: string;

  @Column({ name: 'age', comment: '年龄' })
  age: number;

  @OneToOne(() => UserProfile, profile => profile.user)
  profile: UserProfile;

  @OneToMany(() => UserLog, log => log.user)
  logs: UserLog;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
