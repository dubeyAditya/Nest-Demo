import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxCalculatorModule } from './tax-calculator/tax-calculator.module';
import config from './config';


@Module({
  imports: [TaxCalculatorModule,
    MongooseModule.forRoot(config.mongoConnectionUrl) 
  ],
})
export class AppModule {}
