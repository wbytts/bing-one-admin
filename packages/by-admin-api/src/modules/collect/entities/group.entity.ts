import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_collect_group' })
export class CollectGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'remark', length: 500 })
  remark: string;
}
