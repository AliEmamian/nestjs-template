import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface name {
  fa: string;
  en: string;
  ar: string;
}

export interface filter {
  type: string;
  ids: idObject[]
}

interface idObject {
  id: string;
  order: string;
  isCampaign: boolean;
}

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: true })
  public title: name;

  @Column({ type: 'jsonb', nullable: true })
  public description: name;

  @Column({ type: 'varchar', nullable: true })
  public type: string;  

  @Column({ type: 'varchar', nullable: true })
  public image: string;  

  @Column({ type: 'varchar', array: true, nullable: true })
  public tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  public filter: filter

  @Column({ type: 'jsonb', nullable: true })
  public media: any
}
