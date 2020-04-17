import { Module } from '@nestjs/common';
import { TaxCalculatorModule } from './tax-calculator/tax-calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmConfig } from './config/typeorm.config';


@Module({
  imports: [TaxCalculatorModule,
    TypeOrmModule.forRoot(typrOrmConfig), 
  ],
})
export class AppModule {}
