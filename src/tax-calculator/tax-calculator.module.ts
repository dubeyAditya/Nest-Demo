import { Module } from '@nestjs/common';
import { TaxCalculatorController } from './tax-calculator.controller';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxCalculatorRepository } from './tax-calculator.repository';

@Module({
  imports :[TypeOrmModule.forFeature([TaxCalculatorRepository])],
  controllers: [TaxCalculatorController],
  providers: [TaxCalculatorService,TaxCalculatorServiceHelper,Calculator],
})
export class TaxCalculatorModule {}
