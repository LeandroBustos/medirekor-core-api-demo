import { Organization } from './organization';
import { UserState, UsertTypes } from './../constants/user';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'users', schema: 'core'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'character varying'
  })
  organization_id!: string;

  @Column({
    type: 'character varying'
  })
  first_name!: string;

  @Column({
    type: 'character varying'
  })
  last_name!: string;

  @Column({
    type: 'character varying'
  })
  email!: string;

  @Column({
    type: 'character varying'
  })
  password!: string;

  //NORMALIZAR A LA FECHA DEL ESTE DE ESTADOS UNIDOS
  @CreateDateColumn({
    type: 'timestamp with time zone'
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true
  })
  modified_at!: Date | null;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true
  })
  deleted_at!: Date | null;

  @Column({
    type: 'enum',
    enum: UserState
  })
  state!: UserState;

  @Column({
    type: 'enum',
    enum: UsertTypes,
  })
  type!: UsertTypes;

  @ManyToOne(() => Organization, (organization: Organization) => organization.users)
  @JoinColumn({ name: 'organization_id' })
  organization!: Organization
}

