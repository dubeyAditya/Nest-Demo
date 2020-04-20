import { AgeCriterial, CessCriterial, SalaryRangeCriteria } from "../entity/tax-calculator.entity";
import {IsNumber, IsNotEmpty} from 'class-validator';

export class CreateTaxRuleDto{
    @IsNotEmpty()
    salaryRangeCriteria : SalaryRangeCriteria[];
    @IsNumber()
    year : number;
    ageRangeCriterial : AgeCriterial;
    cessCriteria : CessCriterial;
    @IsNumber()
    taxFreeLimit :number;
}