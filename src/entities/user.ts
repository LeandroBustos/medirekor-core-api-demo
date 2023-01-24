import { UserState, UsertTypes } from './../constants/user';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users', schema: 'core'})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

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
  @Column({
    type: 'timestamp with time zone'
  })
  created_at!: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: true
  })
  modified_at!: Date | null;

  @Column({
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
    enum: UsertTypes
  })
  type!: UsertTypes;
}

