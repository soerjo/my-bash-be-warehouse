import { Module } from '@nestjs/common';
import { TransactionWarehouseService } from './services/transaction-warehouse.service';
import { TransactionWarehouseController } from './controllers/transaction-warehouse.controller';

@Module({
  controllers: [TransactionWarehouseController],
  providers: [TransactionWarehouseService],
})
export class TransactionWarehouseModule {}
