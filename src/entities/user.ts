import { Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Location } from "./location";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    id!: string

    @Column({
        unique: true,
    })
    username!: string

    @Column()
    password!: string

    @Column({
        nullable: true,
        default: null
    })
    fullName?: string

    @Column({
        nullable: true,
        default: null
    })
    email?: string

    @Column({
        nullable: true,
        default: null
    })
    photoURL?: string

    @Column({
        nullable: true,
        default: null
    })
    socialToken!: string

    @Column({
        nullable: true,
        default: null
    })
    loginType!: string

    @Column({
        nullable: true,
        default: null
    })
    birthday!: Date

    @Column({
        nullable: true,
        default: null
    })
    gender!: number

    @Column({
        nullable: true,
        default: null
    })
    address!: string

    @Column({
        nullable: true,
        default: null
    })
    note!: string
    

    @ManyToOne(() => Location, loc => loc.id)
    location!:Location
}