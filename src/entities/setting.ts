import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, JoinTable } from 'typeorm';
import { UserTypes } from '../constants/user';
import { Organization } from './organization';
import { User } from './user';

@Entity({name: 'settings', schema: 'core'})
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'character varying'
    })
    name!: string;

    @Column({
        type: 'text'
    })
    description!: string;

    @Column({
        type: 'enum',
        enum: UserTypes
    })
    type!: UserTypes;

    //   @Column({
    //     type: 'enum'
    //     enum: PlanTypes
    //   })
    //   plan!: string;

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

    @ManyToMany(() => Organization, (organization: Organization) => organization.settings)
    @JoinTable({name: 'organizations_to_settings', 
        joinColumn: {
            name: 'setting_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'organization_id',
            referencedColumnName: 'id'
        }
    })
    organizations!: Organization[]

    @ManyToMany(() => User, (user: User) => user.settings)
    @JoinTable({name: 'organizations_to_settings', 
        joinColumn: {
            name: 'setting_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users!: User[]
}

