import { Injectable } from '@nestjs/common';
import { CreateTransactionWarehouseDto } from '../dto/create-transaction-warehouse.dto';
import { UpdateTransactionWarehouseDto } from '../dto/update-transaction-warehouse.dto';

@Injectable()
export class TransactionWarehouseService {
  create(createTransactionWarehouseDto: CreateTransactionWarehouseDto) {
    return 'This action adds a new transactionWarehouse';
  }

  findAll() {
    return `This action returns all transactionWarehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionWarehouse`;
  }

  update(id: number, updateTransactionWarehouseDto: UpdateTransactionWarehouseDto) {
    return `This action updates a #${id} transactionWarehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionWarehouse`;
  }
}
