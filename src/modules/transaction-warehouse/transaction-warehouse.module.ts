import { Module } from '@nestjs/common';
import { TransactionWarehouseService } from './services/transaction-warehouse.service';
import { TransactionWarehouseController } from './controllers/transaction-warehouse.controller';
import { TransactionWarehouseRepository } from './repositories/transaction-store.repository';

@Module({
  controllers: [TransactionWarehouseController],
  providers: [TransactionWarehouseService, TransactionWarehouseRepository],
  exports: [TransactionWarehouseService],
})
export class TransactionWarehouseModule {}
