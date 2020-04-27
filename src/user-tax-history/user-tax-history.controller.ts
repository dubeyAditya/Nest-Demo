import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { ResponseDto } from '../response.dto';
import { TaxHistory } from './entity/user-tax-history.entity';
import { UserTaxHistoryService } from './user-tax-history.service';

@Controller()
@UseGuards(AuthGuard())
export class UserTaxHistoryController {
    constructor(private service: UserTaxHistoryService){}

    @Get('/getTaxHistory')
    async getUserTaxHistory(@GetUser() user: User): Promise<ResponseDto<TaxHistory[]>>{
        
        const responseDto = new ResponseDto<TaxHistory[]>();
        responseDto.data = await this.service.getUserTaxHistory(user);
        return responseDto;
    }
}
