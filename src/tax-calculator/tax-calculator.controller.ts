import { Controller, Get, Param } from '@nestjs/common';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxRules } from './tax-calculator.model';

@Controller()
export class TaxCalculatorController {
    constructor(private taxService: TaxCalculatorService){

    }

    @Get()
    getHello(){
        return "Hello Nest Js!!!";
    }

    @Get('/:year')
    getTaxRulesByYear(@Param('year') year:number): TaxRules{
        return this.taxService.getTaxRulesByYear(year);
    }

}
