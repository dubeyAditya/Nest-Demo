import { Injectable, Logger } from "@nestjs/common";
import { AgeCriterial, CessCriterial, SalaryRangeCriteria } from "./entity/tax-calculator.entity";
import { Calculator } from "./tax-calculator.utility";
import { IsUppercase } from "class-validator";

@Injectable()
export class TaxCalculatorServiceHelper {
    private logger;
    constructor(private calculator: Calculator) {
        this.logger = new Logger('TaxCalculatorServiceHelper');
     }

    calculateNetTaxableIncome(ammount: number, taxFreeLimit: number,taxFreeInvestment:number): number {
        let netTaxableIncome: number = 0;
        if(taxFreeInvestment<=taxFreeLimit)
            netTaxableIncome = ammount - taxFreeInvestment;
        else
            netTaxableIncome = ammount - taxFreeLimit;
        return netTaxableIncome;
    }

    applyAgeReduction(ammount: number, ageCriteria: AgeCriterial, age: number): number {
        if (age >= ageCriteria.age)
            ammount = ammount - ageCriteria.ammountToDeduct;

        return ammount;
    }

    applySalaryRangeReduction(ammount: number, salaryRangeCriterias: SalaryRangeCriteria[]): number {
        let taxAmmount = 0;
        let previousUpperLimit = 0;
        for(let i:number=0;i< salaryRangeCriterias.length;i++){
            let salaryRangeCriteria = salaryRangeCriterias[i];
            let { lowerLimit, upperLimit, pecentageDeduction } = salaryRangeCriteria;
            let actualUpperLimit = upperLimit;
            upperLimit = upperLimit - previousUpperLimit;
            this.logger.debug(`Ammount ${ammount} Upper Limit ${upperLimit} `);
            if ((ammount < upperLimit)) {
                if(pecentageDeduction>0)
                    taxAmmount =taxAmmount + this.calculator.calculatePercantValue(ammount, pecentageDeduction);
                
                this.logger.debug(`Condition 1: Tax ammount ${taxAmmount}`);
                return taxAmmount;
            } else {
                ammount = ammount - upperLimit;
                if(pecentageDeduction>0)
                    taxAmmount = taxAmmount + this.calculator.calculatePercantValue(upperLimit, pecentageDeduction);
                this.logger.debug(`Condition 2:Ammount ${ammount} Tax ammount ${taxAmmount}`);
            }
            previousUpperLimit = actualUpperLimit;
            if (!this.calculator.checkIfAmtGreaterThanZero(ammount)){
                this.logger.debug(`Ammount ${ammount}`);
                return taxAmmount;
            }
        }

        return taxAmmount;
    }

    checkAndApplyCess(taxAmmount: number, cessCriteria: CessCriterial): number {
        if (taxAmmount > cessCriteria.taxAmmountLimit) {
            taxAmmount += this.calculator.calculatePercantValue(taxAmmount, cessCriteria.percentCess);
        }
        return taxAmmount;
    }
}