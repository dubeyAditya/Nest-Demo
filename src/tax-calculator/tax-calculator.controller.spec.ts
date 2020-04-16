import { Test, TestingModule } from '@nestjs/testing';
import { TaxCalculatorController } from './tax-calculator.controller';

describe('TaxCalculator Controller', () => {
  let controller: TaxCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxCalculatorController],
    }).compile();

    controller = module.get<TaxCalculatorController>(TaxCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
