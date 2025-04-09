import { Test, TestingModule } from '@nestjs/testing';
import { TransactionWarehouseController } from './transaction-warehouse.controller';
import { TransactionWarehouseService } from '../services/transaction-warehouse.service';

describe('TransactionWarehouseController', () => {
  let controller: TransactionWarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionWarehouseController],
      providers: [TransactionWarehouseService],
    }).compile();

    controller = module.get<TransactionWarehouseController>(TransactionWarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
