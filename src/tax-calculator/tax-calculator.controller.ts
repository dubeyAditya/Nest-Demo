import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxRules } from './entity/tax-calculator.entity';
import { CalculteTaxDto } from './dto/calculate-tax.dto';
import { CreateTaxRuleDto } from './dto/create-tax-rule.dto';
import { ResponseDto } from 'src/response.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('taxCalculator')
@UseGuards(AuthGuard())
export class TaxCalculatorController {
    constructor(private taxService: TaxCalculatorService) { 
        
    }

    @Get('/access')
    async loin() : Promise<ResponseDto<string>>{
        const response = new ResponseDto<string>();
        response.data = 'authenticated';
        return response;
    }

    @Get('/getTaxRule/:year')
    async getTaxRulesByYear(@Param('year', ParseIntPipe) year: number): Promise<ResponseDto<TaxRules>> {
        const responseDto = new ResponseDto<TaxRules>();
        responseDto.data = await this.taxService.getTaxRulesByYear(year);
        return responseDto;
    }

    @Post('/calculateTax')
    @UsePipes(ValidationPipe)
    async calculateTax(@Body() calculateTaxDto: CalculteTaxDto, @GetUser() user: User): Promise<ResponseDto<number>> {
        const responseDto = new ResponseDto<number>();
        responseDto.data = await this.taxService.calculateTaxForUser(calculateTaxDto, user);
        return responseDto;
    }

    @Post('/createTaxRule')
    async createTaxRule(@Body() createTaxRuleDto: CreateTaxRuleDto): Promise<ResponseDto<TaxRules>> {
        const responseDto = new ResponseDto<TaxRules>();
        responseDto.data = await this.taxService.createTaxRange(createTaxRuleDto);
        return responseDto;
    }


}
