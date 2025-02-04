import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  public fa: string;

  @Column({ type: 'varchar', nullable: true })
  public en: string;

  @Column({ type: 'varchar', nullable: true })
  public ar: string;
}
