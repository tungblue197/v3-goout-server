import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity('locations')
export class Location extends BaseEntity {
    @PrimaryColumn()
    id!: string

    @Column()
    longitude!: number

    @Column()
    latitude!: number

    @Column({
        nullable: true
    })
    placeName!: string

    @Column({
        nullable: true,
        default: null
    })
    note!: string

}