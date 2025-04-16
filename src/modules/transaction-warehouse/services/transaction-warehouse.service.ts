import { BadRequestException, Injectable } from '@nestjs/common';
import { FindTransactionStoreDto } from '../../../modules/transaction-store/dto/find-transaction-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { TransactionWarehouseRepository } from '../repositories/transaction-store.repository';
import { Transactional } from 'typeorm-transactional';
import { TransactionStoreEntity } from '../../../modules/transaction-store/entities/transaction-store.entity';

@Injectable()
export class TransactionWarehouseService {
  constructor(
    private readonly transactionWarehouseRepository: TransactionWarehouseRepository,
  ) {}

  @Transactional()
  async createTransaction(transactionStore: TransactionStoreEntity, userPayload: IJwtPayload){
    const lastTransaction = await this.transactionWarehouseRepository.findOne({
      where: {
        warehouse_id: userPayload.warehouse_id
      },
      order: {
        created_at: 'DESC'
      }
    })

    const transaction = this.transactionWarehouseRepository.create({
      last_transaction_id: lastTransaction?.id,
      store_id: transactionStore.store_id,
      store_name: transactionStore.store_name,
      store_price: transactionStore.store_price,
      amount: transactionStore.amount,
      total_price: transactionStore.total_price,
      fee_price: transactionStore.fee_price,
      final_price: transactionStore.final_price,
      category_store_id: transactionStore.category_store_id,
      category_name: transactionStore.category_name,
      category_code: transactionStore.category_code,
      unit_id: transactionStore.unit_id,
      unit_name: transactionStore.unit_name,
      unit_code: transactionStore.unit_code,
      transaction_type_id: transactionStore.transaction_type_id,
      bank_id: transactionStore.bank_id,
      warehouse_id: transactionStore.warehouse_id,
    })

    await this.transactionWarehouseRepository.save(transaction)
  }
  
  findAll(dto: FindTransactionStoreDto, userPayload: IJwtPayload) {
    return this.transactionWarehouseRepository.findAll(dto, userPayload);
  }

  findOne(id: string) {
    return this.transactionWarehouseRepository.findOneBy({ id });
  }


}
