import { Module } from '@nestjs/common';
import { TransactionStoreService } from './services/transaction-store.service';
import { TransactionStoreController } from './controllers/transaction-store.controller';
import { TransactionStoreRepository } from './repositories/transaction-store.repository';
import { StoreModule } from '../store/store.module';
import { TransactionWarehouseModule } from '../transaction-warehouse/transaction-warehouse.module';

@Module({
  imports: [StoreModule, TransactionWarehouseModule],
  controllers: [TransactionStoreController],
  providers: [TransactionStoreService, TransactionStoreRepository],
  exports: [TransactionStoreService],
})
export class TransactionStoreModule {}
