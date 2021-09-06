import { Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Location } from "./location";
import { User } from "./user";

@Entity('sessions')
export class Session extends BaseEntity {
    @PrimaryColumn()
    id!: string

    @Column({
        nullable: true,
        default: null
    })
    title!: string

    @ManyToOne(() => User, user => user.id)
    createdBy!: User
    @Column({
        nullable: true,
        default: null
    })
    content!: string

    @Column({
        nullable: true,
        default: 0
    })
    timeout?: number

    @Column({
        nullable: true,
        default: false
    })
    done!: boolean

    @ManyToOne(() => Location, loc => loc.id)
    winLocation!: string

    @ManyToMany(() => Location, loc => loc.id, { cascade: true })
    @JoinTable()
    locations!: Location[]

    addLocation(location: Location){
        if(this.locations == null){
            this.locations =  new Array<Location>();
        }
        this.locations.push(location)
    }

}