import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TaxRules } from './entity/tax-calculator.entity';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { TaxCalculatorRepository } from './tax-calculator.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { UserTaxHistoryService } from '../user-tax-history/user-tax-history.service';


@Injectable()
export class TaxCalculatorService {
    private logger;
    constructor(private taxServiceHelper: TaxCalculatorServiceHelper,
        private calculator: Calculator,
        private taxHistoryService: UserTaxHistoryService,
        @InjectRepository(TaxCalculatorRepository)
        private repository: TaxCalculatorRepository) {
        this.logger = new Logger("TaxCalculatorService");
    }

    async getTaxRulesByYear(year: number): Promise<TaxRules> {
        const taxRules: TaxRules[] = await this.repository.find();
        const taxRule = taxRules.filter((taxRule)=>taxRule.year == year)
        if (!taxRule.length) {
            throw new NotFoundException(`No Tax Rules found for the Year ${year}`);
        }
        return taxRule[0];
    }

    async calculateTaxForUser(calculateTaxDto: CalculteTaxDto, user: User): Promise<number> {
        const { year, yearlySalary, taxFreeInvestment, age } = calculateTaxDto;
        this.logger.debug('User Income Details', calculateTaxDto);

        const taxRules = await this.getTaxRulesByYear(year);

        let remainingSalary = this.taxServiceHelper.calculateNetTaxableIncome(yearlySalary, taxRules.taxFreeLimit,taxFreeInvestment);
        this.logger.debug(`Remaining sal after reducing taxable income ${remainingSalary}`);
        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;
        remainingSalary = this.taxServiceHelper.applyAgeReduction(remainingSalary, taxRules.ageRangeCriterial, age);
        this.logger.debug(`Remaining sal after reducing Age deductions ${remainingSalary}`);
        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;

        let taxAmmount = this.taxServiceHelper.applySalaryRangeReduction(remainingSalary, taxRules.salaryRangeCriteria);

        taxAmmount = this.taxServiceHelper.checkAndApplyCess(taxAmmount, taxRules.cessCriteria);

        await this.taxHistoryService.saveUserHistory(taxAmmount, user.userId, yearlySalary, age, year, taxFreeInvestment);

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
