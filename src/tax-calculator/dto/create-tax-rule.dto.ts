import { AgeCriterial, CessCriterial } from "../tax-calculator.model";

export class CreateTaxRuleDto{
    salaryRangeCriteria : Map<number,number>;
    year : number;
    ageRangeCriterial : AgeCriterial;
    cessCriteria : CessCriterial;
    taxFreeLimit :number;
}