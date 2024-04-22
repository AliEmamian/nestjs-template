import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { nullable: false, unique: true, length: 20, name: 'phone' })
  public phone: string | null;

  @Column('text', { nullable: true, unique: false, array: true, name: 'extraPhones' })
  public extraPhones: Array<string>;

  @Column('character varying', { nullable: true, unique: true, length: 30, name: 'email' })
  public email: string | null;

  @Column('text', { nullable: true, unique: false, array: true, name: 'extraEmails' })
  public extraEmails: Array<string>;

  @Column({ type: 'varchar', nullable: true })
  public nationalCode: string;

  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public createdAt: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  public isActive: boolean;

  @Column({ type: 'varchar', nullable: true, default: RoleEnum.USER })
  public role: string;

  @Column({ type: 'varchar', nullable: true })
  public otpCode: number;

  @Column({ type: 'varchar', nullable: true })
  public countOtp: number;

  @Column({ type: 'varchar', nullable: true })
  public expireOtp: string;

  @Column({ type: 'varchar', nullable: true })
  public mac: string;

}
