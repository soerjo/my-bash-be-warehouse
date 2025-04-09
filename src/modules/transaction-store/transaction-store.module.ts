import { Module } from '@nestjs/common';
import { TransactionStoreService } from './services/transaction-store.service';
import { TransactionStoreController } from './controllers/transaction-store.controller';

@Module({
  controllers: [TransactionStoreController],
  providers: [TransactionStoreService],
})
export class TransactionStoreModule {}
