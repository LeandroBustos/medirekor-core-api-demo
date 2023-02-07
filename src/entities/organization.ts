import { User } from './user';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({name: 'organizations', schema: 'core'})
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'character varying'
    })
    name!: string;

    @Column({
        type: 'character varying'
    })
    country!: string;

    @Column({
        type: 'character varying'
    })
    state!: string;

    @Column({
        type: 'character varying'
    })
    city!: string;

    @Column({
        type: 'character varying'
    })
    address!: string;
    
    @Column({
        type: 'character varying'
    })
    email!: string;

    @Column({
        type: 'character varying'
    })
    phone_number!: string;

    //TODO NORMALIZAR A LA FECHA DEL ESTE DE ESTADOS UNIDOS
    @CreateDateColumn({
        type: 'timestamp without time zone'
    })
    created_at!: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        nullable: true
    })
    modified_at!: Date | null;

    @DeleteDateColumn({
        type: 'timestamp without time zone',
        nullable: true
    })
    deleted_at!: Date | null;

    @OneToMany(() => User, (user: User) => user.organization) 
    users!: User[]
}

