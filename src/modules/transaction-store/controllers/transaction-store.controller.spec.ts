import { Test, TestingModule } from '@nestjs/testing';
import { TransactionStoreController } from './transaction-store.controller';
import { TransactionStoreService } from '../services/transaction-store.service';

describe('TransactionStoreController', () => {
  let controller: TransactionStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionStoreController],
      providers: [TransactionStoreService],
    }).compile();

    controller = module.get<TransactionStoreController>(TransactionStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
