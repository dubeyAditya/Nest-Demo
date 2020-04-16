import { Controller, Get, Param,Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxRules } from './tax-calculator.model';
import { CalculteTaxDto } from './dto/calculate-tax.dto';

@Controller()
export class TaxCalculatorController {
    constructor(private taxService: TaxCalculatorService){

    }

    @Get()
    getHello(){
        return "Hello Nest Js!!!";
    }

    @Get('/getTaxRule/:year')
    getTaxRulesByYear(@Param('year') year:number): TaxRules{
        return this.taxService.getTaxRulesByYear(year);
    }

    @Post('/calculateTax')
    @UsePipes(ValidationPipe)
    calculateTax(@Body() calculateTaxDto: CalculteTaxDto) : number{
        return this.taxService.calculateTaxForUser(calculateTaxDto);
    }


}
