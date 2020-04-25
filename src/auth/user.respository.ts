import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthUserDto } from "./dto/authUser";
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    private logger = new Logger('UserRepo');

    async saveUser(authUser: AuthUserDto): Promise<User> {
        const user = new User();
        user.salt = await bcrypt.genSalt();
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

    async validateUser(authUserDto: AuthUserDto): Promise<string> {
        const { userName, password } = authUserDto;
        const user = await this.findOne({ userName });
        this.logger.log(` ${JSON.stringify(user)}`);
        const isValidPassword = await user.validatePassword(password);
        this.logger.log('Is password valid' + isValidPassword);
        if (user && isValidPassword) {
            return userName;
        }
        return null;
    }
}