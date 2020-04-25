import { Repository, EntityRepository } from "typeorm";
import { TaxHistory } from "./entity/user-tax-history.entity";

@EntityRepository(TaxHistory)
export class TaxHistoryRepository extends Repository<TaxHistory>{

    async createTaxHistory(result: number, userId: number, yearlySal: number, 
        age: number, year: number, taxFreeInvestment: number): Promise<TaxHistory> {
        const taxHistory = new TaxHistory();
        taxHistory.age = age;
        taxHistory.userId = userId;
        taxHistory.year = year;
        taxHistory.yearlySalary = yearlySal;
        taxHistory.result = result;

        await taxHistory.save();

        return taxHistory;
    }
}