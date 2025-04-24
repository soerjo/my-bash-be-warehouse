import { forwardRef, Module } from '@nestjs/common';
import { TransactionStoreService } from './services/transaction-store.service';
import { TransactionStoreController } from './controllers/transaction-store.controller';
import { TransactionStoreRepository } from './repositories/transaction-store.repository';
import { StoreModule } from '../store/store.module';
import { TransactionWarehouseModule } from '../transaction-warehouse/transaction-warehouse.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    TransactionWarehouseModule,
    BankModule,
    forwardRef(() => StoreModule), 
  ],
  controllers: [TransactionStoreController],
  providers: [TransactionStoreService, TransactionStoreRepository],
  exports: [TransactionStoreService],
})
export class TransactionStoreModule {}
