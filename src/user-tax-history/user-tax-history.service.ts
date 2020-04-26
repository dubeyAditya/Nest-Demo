import { Injectable } from '@nestjs/common';
import { TaxHistoryRepository } from './user-tax-history.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxHistory } from './entity/user-tax-history.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class UserTaxHistoryService {
    constructor(
        @InjectRepository(TaxHistoryRepository)
        private taxHistoryRepository: TaxHistoryRepository) { }

    async getUserTaxHistory(user: User): Promise<TaxHistory[]> {
        return this.taxHistoryRepository.find({ userId: user.userId });
    }
}
