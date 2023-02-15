import { Setting } from './setting';
import { User } from './user';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from 'typeorm';

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

    @ManyToMany(() => Setting, (setting: Setting) => setting.organizations) 
    @JoinTable({name: 'organizations_to_settings', 
        joinColumn: {
            name: 'organization_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'setting_id',
            referencedColumnName: 'id'
        }
    })
    settings!: Setting[]
}

