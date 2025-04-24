import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { StoreRepository } from './repositories/store.repository';
import { CategoryModule } from '../category/category.module';
import { FeeModule } from '../fee/fee.module';
import { StoreLogsRepository } from './repositories/store-logs.repository';
import { TransactionStoreModule } from '../transaction-store/transaction-store.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    forwardRef(() => TransactionStoreModule), 
    BankModule,
    CategoryModule, 
    FeeModule],
  controllers: [StoreController],
  providers: [
    StoreService, 
    StoreRepository,
    StoreLogsRepository,
  ],
  exports: [StoreService],
})
export class StoreModule {}
