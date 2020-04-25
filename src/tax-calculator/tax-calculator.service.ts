import { Injectable, NotFoundException } from '@nestjs/common';
import { TaxRules, AgeCriterial, CessCriterial } from './entity/tax-calculator.entity';
import * as uuid from 'uuid/v1';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { TaxCalculatorRepository } from './tax-calculator.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TaxHistoryRepository } from 'src/user-tax-history/user-tax-history.repository';

@Injectable()
export class TaxCalculatorService {

    constructor(private taxServiceHelper: TaxCalculatorServiceHelper,
        private calculator: Calculator,
        @InjectRepository(TaxHistoryRepository)
        private taxHistoryRepository: TaxHistoryRepository,
        @InjectRepository(TaxCalculatorRepository)
        private repository: TaxCalculatorRepository) { }

    async getTaxRulesByYear(year: number): Promise<TaxRules> {

        const taxRule = await this.repository.findOne({ year });
        if (!taxRule) {

            throw new NotFoundException(`No Tax Rules found for the Year ${year}`);
        }
        return taxRule;
    }

    async calculateTaxForUser(calculateTaxDto: CalculteTaxDto, user: User): Promise<number> {
        const { year, yearlySalary, taxFreeInvestment, age } = calculateTaxDto;

        const taxRules = await this.getTaxRulesByYear(year);

        let remainingSalary = this.taxServiceHelper.calculateNetTaxableIncome(yearlySalary, taxRules.taxFreeLimit);
        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;
        remainingSalary = this.taxServiceHelper.applyAgeReduction(remainingSalary, taxRules.ageRangeCriterial, age);

        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;

        let taxAmmount = this.taxServiceHelper.applySalaryRangeReduction(remainingSalary, taxRules.salaryRangeCriteria);

        taxAmmount = this.taxServiceHelper.checkAndApplyCess(taxAmmount, taxRules.cessCriteria);

        this.taxHistoryRepository.createTaxHistory(taxAmmount,user.userId,yearlySalary,age,year,taxFreeInvestment);
        
        return taxAmmount;

    }
    /*
    * Method for creating TaxRules 
    */
    createTaxRange(createTaxRuleDto: CreateTaxRuleDto): Promise<TaxRules> {
        return this.repository.createTaxRules(createTaxRuleDto);
    }
}
