import { BaseEntity, Entity, ObjectIdColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
//for defining unique columns
@Unique(['userName'])
export class User extends BaseEntity{

    @ObjectIdColumn()
    userId : number;

    @Column()
    userName : string;
    @Column()
    password : string;

    @Column()
    salt : string;

    async validatePassword(password:string):Promise<boolean>{
        const hash = bcrypt.hash(password,this.salt);
        return hash === this.password;
    }
}