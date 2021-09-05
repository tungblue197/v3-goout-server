import { Entity, BaseEntity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Location } from "./location";
import { User } from "./user";
@Entity('votes')
export class Vote extends BaseEntity {
    @PrimaryColumn()
    id!: string
    
    @OneToOne(() => Location)
    @JoinColumn()
    location!: Location
    
    @OneToOne(() => User)
    @JoinColumn()
    user!: User
}