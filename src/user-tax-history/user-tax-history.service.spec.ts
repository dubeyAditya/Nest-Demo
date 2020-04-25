import { Test, TestingModule } from '@nestjs/testing';
import { UserTaxHistoryService } from './user-tax-history.service';

describe('UserTaxHistoryService', () => {
  let service: UserTaxHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaxHistoryService],
    }).compile();

    service = module.get<UserTaxHistoryService>(UserTaxHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
