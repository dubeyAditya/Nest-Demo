import { BaseEntity, Entity, ObjectIdColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Logger } from "@nestjs/common";

@Entity()
//for defining unique columns
@Unique(['userName'])
export class User extends BaseEntity{
    private logger = new Logger('User');

    @ObjectIdColumn()
    userId : number;

    @Column()
    userName : string;
    @Column()
    password : string;

    @Column()
    salt : string;

    async validatePassword(password:string):Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        this.logger.debug('The generated password hash is :' + JSON.stringify(hash));
        return hash === this.password;
    }
}