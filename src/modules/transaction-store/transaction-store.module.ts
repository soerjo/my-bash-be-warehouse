import { Module } from '@nestjs/common';
import { TransactionStoreService } from './services/transaction-store.service';
import { TransactionStoreController } from './controllers/transaction-store.controller';
import { TransactionStoreRepository } from './repositories/transaction-store.repository';
import { CategoryModule } from '../category/category.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [TransactionStoreController],
  providers: [TransactionStoreService, TransactionStoreRepository],
  exports: [TransactionStoreService],
})
export class TransactionStoreModule {}
