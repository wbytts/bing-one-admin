import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CollectTag } from './tag.entity';

@Entity({ name: 't_collect_url' })
export class CollectUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 255, default: '' })
  title: string;

  @Column({ name: 'url', type: 'text' })
  url: string;

  @Column({ name: 'remark', length: 500, default: '' })
  remark: string;

  @ManyToMany(() => CollectTag)
  @JoinTable()
  tags: CollectTag[];
}
