import { IsNumber } from 'class-validator';

export class CalculteTaxDto {
    @IsNumber()
    year: number;
    @IsNumber()
    yearlySalary: number;
    @IsNumber()
    taxFreeInvestment: number;
    @IsNumber()
    age: number;
}