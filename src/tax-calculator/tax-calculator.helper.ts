import { Injectable } from "@nestjs/common";
import { AgeCriterial, CessCriterial, SalaryRangeCriteria } from "./entity/tax-calculator.entity";
import { Calculator } from "./tax-calculator.utility";

@Injectable()
export class TaxCalculatorServiceHelper {
    constructor(private calculator: Calculator) { }

    calculateNetTaxableIncome(ammount: number, taxFreeLimit: number): number {
        return ammount - taxFreeLimit;
    }

    applyAgeReduction(ammount: number, ageCriteria: AgeCriterial, age: number): number {
        if (age >= ageCriteria.age)
            ammount = ammount - ageCriteria.ammountToDeduct;

        return ammount;
    }

    applySalaryRangeReduction(ammount: number, salaryRangeCriteria: SalaryRangeCriteria[]): number {
        let taxAmmount = 0;

        salaryRangeCriteria.forEach((salaryRangeCriteria: SalaryRangeCriteria, index: number) => {
            const { lowerLimit, upperLimit, pecentageDeduction } = salaryRangeCriteria;
            if (lowerLimit <= ammount && ammount < upperLimit) {
                taxAmmount += this.calculator.calculatePercantValue(ammount, pecentageDeduction);
            } else {
                ammount = ammount - upperLimit;
                taxAmmount += this.calculator.calculatePercantValue(upperLimit, pecentageDeduction);
            }

            if (!this.calculator.checkIfAmtGreaterThanZero(ammount))
                return taxAmmount;
        });

        return taxAmmount;
    }

    checkAndApplyCess(taxAmmount: number, cessCriteria: CessCriterial): number {
        if (taxAmmount > cessCriteria.taxAmmountLimit) {
            taxAmmount += this.calculator.calculatePercantValue(taxAmmount, cessCriteria.percentCess);
        }
        return taxAmmount;
    }
}