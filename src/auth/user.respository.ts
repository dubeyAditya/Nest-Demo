import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthUserDto } from "./dto/authUser";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository()
export class UserRepository extends Repository<User>{

    async saveUser(authUser: AuthUserDto): Promise<User> {
        let user = new User();
        user.salt = await bcrypt.getSalt();
        user.userName = authUser.userName;
        user.password = await bcrypt.hash(authUser.password, user.salt);
        try {
            await user.save();
        }
        catch (ex) {
            if (ex.code === 23505) {
                throw new ConflictException('User Already Exist');
            } else {
                throw new InternalServerErrorException();
            }
        }

        return user;
    }

    async validateUser(authUserDto: AuthUserDto): Promise<string>{
        const { userName, password } = authUserDto;
        const user = this.findOne({ userName });
        if (user && (await user).validatePassword(password)) {
            return userName;
        }
        return null;
    }
}