import { Module } from '@nestjs/common';
import { TaxCalculatorModule } from './tax-calculator/tax-calculator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TaxCalculatorModule,
    TypeOrmModule.forRoot(typrOrmConfig),
    AuthModule, 
  ],
})
export class AppModule {}
