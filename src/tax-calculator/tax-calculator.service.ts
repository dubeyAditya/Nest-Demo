import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TaxRules } from './entity/tax-calculator.entity';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { TaxCalculatorRepository } from './tax-calculator.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TaxHistoryRepository } from 'src/user-tax-history/user-tax-history.repository';
import { json } from 'express';
import { getMongoManager, getMongoRepository } from 'typeorm';
import { IsEmpty } from 'class-validator';


@Injectable()
export class TaxCalculatorService {
    private logger;
    constructor(private taxServiceHelper: TaxCalculatorServiceHelper,
        private calculator: Calculator,
        @InjectRepository(TaxHistoryRepository)
        private taxHistoryRepository: TaxHistoryRepository,
        @InjectRepository(TaxCalculatorRepository)
        private repository: TaxCalculatorRepository) {
        this.logger = new Logger("TaxCalculatorService");
    }

    async getTaxRulesByYear(year: number): Promise<TaxRules> {
        const entityManager = getMongoRepository(TaxRules);
       
        const taxRules: TaxRules[] = await this.repository.find();
        this.logger.debug(`Tax Rules ${JSON.stringify(taxRules)}`)
        const taxRule = taxRules.filter((taxRule)=>taxRule.year == year)
        this.logger.debug(`Tax Rules ${JSON.stringify(taxRule)}`)
        if (!taxRule.length) {
            throw new NotFoundException(`No Tax Rules found for the Year ${year}`);
        }
        return taxRule[0];
    }

    async calculateTaxForUser(calculateTaxDto: CalculteTaxDto, user: User): Promise<number> {
        const { year, yearlySalary, taxFreeInvestment, age } = calculateTaxDto;
        this.logger.debug('User Income Details', calculateTaxDto);

        const taxRules = await this.getTaxRulesByYear(year);

        let remainingSalary = this.taxServiceHelper.calculateNetTaxableIncome(yearlySalary, taxRules.taxFreeLimit);
        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;
        remainingSalary = this.taxServiceHelper.applyAgeReduction(remainingSalary, taxRules.ageRangeCriterial, age);

        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;

        let taxAmmount = this.taxServiceHelper.applySalaryRangeReduction(remainingSalary, taxRules.salaryRangeCriteria);

        taxAmmount = this.taxServiceHelper.checkAndApplyCess(taxAmmount, taxRules.cessCriteria);

        this.taxHistoryRepository.createTaxHistory(taxAmmount, user.userId, yearlySalary, age, year, taxFreeInvestment);

        return taxAmmount;

    }
    /*
    * Method for creating TaxRules 
    */
    createTaxRange(createTaxRuleDto: CreateTaxRuleDto): Promise<TaxRules> {
        this.logger.log(`Create Tax Rule DTO form Request: ${JSON.stringify(createTaxRuleDto)}`);

        return this.repository.createTaxRules(createTaxRuleDto);
    }
}
