import { Controller, Get, Param,Post, UsePipes, ValidationPipe, Body, ParseIntPipe } from '@nestjs/common';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxRules } from './entity/tax-calculator.entity';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';

@Controller()
export class TaxCalculatorController {
    constructor(private taxService: TaxCalculatorService){}

    @Get()
    getHello(){
        return "Hello Nest Js!!!";
    }

    @Get('/getTaxRule/:year')
    getTaxRulesByYear(@Param('year',ParseIntPipe) year:number): Promise<TaxRules>{
        return this.taxService.getTaxRulesByYear(year);
    }

    @Post('/calculateTax')
    @UsePipes(ValidationPipe)
    calculateTax(@Body() calculateTaxDto: CalculteTaxDto) : number{
        return this.taxService.calculateTaxForUser(calculateTaxDto);
    }

    @Post('/createTaxRule')
    createTaxRule(@Body() createTaxRuleDto : CreateTaxRuleDto) : Promise<TaxRules>{
       try{
        return this.taxService.createTaxRange(createTaxRuleDto);
       }catch(Ex){
           console.log(Ex);
       } 
    }


}
