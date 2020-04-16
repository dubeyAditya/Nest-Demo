import { Module } from '@nestjs/common';
import { TaxCalculatorController } from './tax-calculator.controller';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';

@Module({
  controllers: [TaxCalculatorController],
  providers: [TaxCalculatorService,TaxCalculatorServiceHelper],
})
export class TaxCalculatorModule {}
