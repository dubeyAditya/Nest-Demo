import { Test, TestingModule } from '@nestjs/testing';
import { UserTaxHistoryController } from './user-tax-history.controller';

describe('UserTaxHistory Controller', () => {
  let controller: UserTaxHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTaxHistoryController],
    }).compile();

    controller = module.get<UserTaxHistoryController>(UserTaxHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
