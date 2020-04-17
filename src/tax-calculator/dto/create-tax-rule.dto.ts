import { AgeCriterial, CessCriterial } from "../entity/tax-calculator.entity";
import {IsNumber, IsNotEmpty} from 'class-validator';

export class CreateTaxRuleDto{
    @IsNotEmpty()
    salaryRangeCriteria : Map<number,number>;
    @IsNumber()
    year : number;
    @IsNotEmpty()
    ageRangeCriterial : AgeCriterial;
    @IsNotEmpty()
    cessCriteria : CessCriterial;
    @IsNumber()
    taxFreeLimit :number;
}