import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { SettingGroupTypes, SettingStates } from '../constants/setting';
import { Setting } from './setting';
import { Organization } from './organization';
import { User } from './user';

@Entity({name: 'organizations_to_settings', schema: 'core'})
export class OrganizationsToSettings {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'uuid'
    })
    setting_id!: string;

    @Column({
        type: 'uuid'
    })
    organization_id!: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    user_id!: string | null;

    @Column({
        type: 'enum',
        enum: SettingGroupTypes
    })
    type!: SettingGroupTypes;

    @Column({
        type: 'enum',
        enum: SettingStates
    })
    state!: SettingStates;

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

    @ManyToOne(() => Setting)
    @JoinColumn({ name: 'setting_id' })
    setting!: Setting

    @ManyToOne(() => Organization)
    @JoinColumn({ name: 'organization_id' })
    organization!: Organization

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    users!: User[]
}

