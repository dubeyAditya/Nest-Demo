import { Module } from '@nestjs/common';
import { UserTaxHistoryController } from './user-tax-history.controller';
import { UserTaxHistoryService } from './user-tax-history.service';
import { TaxHistoryRepository } from './user-tax-history.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaxHistoryRepository]),AuthModule],
  controllers: [UserTaxHistoryController],
  providers: [UserTaxHistoryService,]
})
export class UserTaxHistoryModule {}
