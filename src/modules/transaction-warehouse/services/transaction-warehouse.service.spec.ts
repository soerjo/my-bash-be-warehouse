import { Test, TestingModule } from '@nestjs/testing';
import { TransactionWarehouseService } from './transaction-warehouse.service';

describe('TransactionWarehouseService', () => {
  let service: TransactionWarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionWarehouseService],
    }).compile();

    service = module.get<TransactionWarehouseService>(TransactionWarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
