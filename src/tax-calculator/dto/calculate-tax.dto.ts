import {IsNotEmpty, IsNumber} from 'class-validator';

export class CalculteTaxDto{
    @IsNumber()
    year: number;
    @IsNumber()
    yearlySalary : number;
    @IsNumber()
    taxFreeInverstment : number;
    @IsNumber()
    age : number;
}