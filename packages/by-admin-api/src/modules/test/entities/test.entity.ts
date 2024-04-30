import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_test' })
export class Test {
  // @PrimaryGeneratedColumn("uuid")
  @PrimaryGeneratedColumn({ comment: '这是 id' })
  id?: number;

  @Column({ name: 'name', length: 500, comment: '这是name字段，表示一个名字' })
  name: string;

  @Column({
    name: 'value',
    length: 500,
    comment: '这是value字段，表示一个值~'
  })
  value: string;
}
