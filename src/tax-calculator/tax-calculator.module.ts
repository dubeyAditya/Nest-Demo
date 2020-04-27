import { Module } from '@nestjs/common';
import { TaxCalculatorController } from './tax-calculator.controller';
import { TaxCalculatorService } from './tax-calculator.service';
import { TaxCalculatorServiceHelper } from './tax-calculator.helper';
import { Calculator } from './tax-calculator.utility';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxCalculatorRepository } from './tax-calculator.repository';
import { AuthModule } from '../auth/auth.module';
import { UserTaxHistoryModule } from '../user-tax-history/user-tax-history.module';
import { TaxHistoryRepository } from '../user-tax-history/user-tax-history.repository';

@Module({
  imports :[TypeOrmModule.forFeature([TaxCalculatorRepository,TaxHistoryRepository]),
  AuthModule,UserTaxHistoryModule],
  controllers: [TaxCalculatorController],
  providers: [TaxCalculatorService,TaxCalculatorServiceHelper,Calculator],
})
export class TaxCalculatorModule {}
