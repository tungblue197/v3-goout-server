import { Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Location } from "./location";

@Entity('sessions')
export class Session extends BaseEntity {
    @PrimaryColumn()
    id!: string

    @Column({
        nullable: true,
        default: null
    })
    title!: string

    @Column({
        nullable: true,
        default: null
    })
    content!: string

    @Column({
        nullable: true,
        default: false
    })
    done!: boolean

    @OneToOne(() => Location)
    @JoinColumn()
    winLocation!: string

    @ManyToMany(() => Location)
    @JoinTable()
    locations!: Location[]

}