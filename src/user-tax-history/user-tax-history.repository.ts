import { Repository, EntityRepository } from "typeorm";
import { TaxHistory } from "./entity/user-tax-history.entity";
import { Logger } from "@nestjs/common";

@EntityRepository(TaxHistory)
export class TaxHistoryRepository extends Repository<TaxHistory>{
    private logger ;
    constructor(){
        super();
        this.logger = new Logger('TaxHistoryRepo');
        this.logger.debug('Tax Histriy Repo Intilized');
    }

    async createTaxHistory(result: number, userId: number, yearlySal: number,
        age: number, year: number, taxFreeInvestment: number): Promise<TaxHistory> {
        const taxHistory = new TaxHistory();
        taxHistory.age = age;
        taxHistory.userId = userId;
        taxHistory.year = year;
        taxHistory.yearlySalary = yearlySal;
        taxHistory.result = result;
        taxHistory.taxFreeInvestment = taxFreeInvestment;
        await taxHistory.save();
        this.logger.debug(`Value of tax History ${JSON.stringify(taxHistory)}`);
        return taxHistory;
    }
}