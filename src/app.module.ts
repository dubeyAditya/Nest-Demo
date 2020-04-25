import { Module } from '@nestjs/common';
import { TaxCalculatorModule } from './tax-calculator/tax-calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserTaxHistoryModule } from './user-tax-history/user-tax-history.module';


@Module({
  imports: [TaxCalculatorModule,
    TypeOrmModule.forRoot(typrOrmConfig),
    AuthModule,
    UserTaxHistoryModule, 
  ],
})
export class AppModule {}
