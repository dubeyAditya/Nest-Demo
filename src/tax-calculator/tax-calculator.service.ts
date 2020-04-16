import { Injectable } from '@nestjs/common';
import { TaxRules, AgeCriterial, CessCriterial } from './tax-calculator.model';
import * as uuid from 'uuid/v1';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';

@Injectable()
export class TaxCalculatorService {

    constructor(private taxServiceHelper: TaxCalculatorServiceHelper,
        private calculator: Calculator) { }

    getTaxRulesByYear(year: number): TaxRules {
        //TODO fetch TaxRules
        return null;
    }

    calculateTaxForUser(calculateTaxDto: CalculteTaxDto): number {
        const { year, yearlySalary, taxFreeInverstment, age } = calculateTaxDto;

        let taxRules = this.getTaxRulesByYear(year);

        let remainingSalary = this.taxServiceHelper.calculateNetTaxableIncome(yearlySalary, taxRules.taxFreeLimit);
        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;
        remainingSalary = this.taxServiceHelper.applyAgeReduction(remainingSalary, taxRules.ageRangeCriterial, age);

        if (!this.calculator.checkIfAmtGreaterThanZero(remainingSalary))
            return 0;

        let taxAmmount = this.taxServiceHelper.applySalaryRangeReduction(remainingSalary, taxRules.salaryRangeCriteria);

        taxAmmount = this.taxServiceHelper.checkAndApplyCess(taxAmmount, taxRules.cessCriteria);

        return taxAmmount;

    }
    /*
    * Method for creating TaxRules 
    */
    createTaxRange(createTaxRuleDto: CreateTaxRuleDto): TaxRules {

        const taxRules: TaxRules = {
            id: uuid(),
            salaryRangeCriteria: createTaxRuleDto.salaryRangeCriteria,
            ageRangeCriterial: createTaxRuleDto.ageRangeCriterial,
            cessCriteria: createTaxRuleDto.cessCriteria,
            year: createTaxRuleDto.year,
            taxFreeLimit: createTaxRuleDto.taxFreeLimit
        };
        //::TODO::
        //code for saving criteria
        return taxRules;
    }
}
