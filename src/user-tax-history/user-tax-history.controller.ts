import { Controller, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ResponseDto } from 'src/response.dto';
import { TaxHistory } from './entity/user-tax-history.entity';
import { UserTaxHistoryService } from './user-tax-history.service';

@Controller()
@UseGuards(AuthGuard())
export class UserTaxHistoryController {
    constructor(private service: UserTaxHistoryService){}

    @Post('/getTaxHistory')
    async getUserTaxHistory(@GetUser() user: User): Promise<ResponseDto<TaxHistory[]>>{
        
        const responseDto = new ResponseDto<TaxHistory[]>();
        responseDto.data = await this.service.getUserTaxHistory(user);
        return responseDto;
    }
}
