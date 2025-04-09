import { Injectable } from '@nestjs/common';
import { CreateTransactionStoreDto } from '../dto/create-transaction-store.dto';
import { UpdateTransactionStoreDto } from '../dto/update-transaction-store.dto';

@Injectable()
export class TransactionStoreService {
  create(createTransactionStoreDto: CreateTransactionStoreDto) {
    return 'This action adds a new transactionStore';
  }

  findAll() {
    return `This action returns all transactionStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionStore`;
  }

  update(id: number, updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return `This action updates a #${id} transactionStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionStore`;
  }
}
