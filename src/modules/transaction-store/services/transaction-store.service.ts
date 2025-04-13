import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionStoreArrayDto, CreateTransactionStoreDto } from '../dto/create-transaction-store.dto';
import { UpdateTransactionStoreDto } from '../dto/update-transaction-store.dto';
import { FindTransactionStoreDto } from '../dto/find-transaction-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { TransactionStoreRepository } from '../repositories/transaction-store.repository';
import { TransactionTypeEnum } from '../../../common/constant/transaction-type.constant';
import { TransactionStatusEnum } from '../../../common/constant/transaction-status.constant';
import { StoreService } from '../../../modules/store/services/store.service';
import { TransactionStoreEntity } from '../entities/transaction-store.entity';
import { DataSource } from 'typeorm';
import Decimal from 'decimal.js';

@Injectable()
export class TransactionStoreService {
  constructor(
    private readonly transactionStoreRepository: TransactionStoreRepository,
    private readonly storeService: StoreService,
    private readonly dataSource: DataSource,
  ) {}

  async deposit(transactionList: CreateTransactionStoreDto[], userPayload: IJwtPayload) {
    return this.dataSource.transaction(async (manager) => {
      let listNewTransactionStore: TransactionStoreEntity[] = [];
      for (const transaction of transactionList) {
        const store = await this.storeService.findOne(transaction.store_id,userPayload,  manager);
        if (!store) throw new BadRequestException('Category not found');

        const newTransactionStore = this.transactionStoreRepository.create({
          ...transaction,
          price_per_unit: new Decimal(store.price),
          total_price: new Decimal(store.price).mul(transaction.amount),
          created_by: userPayload.id,
          bank_id: userPayload.bank_id,
          warehouse_id: userPayload.warehouse_id,
          transaction_status_id: TransactionStatusEnum.PENDING,
          transaction_type_id: TransactionTypeEnum.DEPOSIT,
        });
        listNewTransactionStore.push(newTransactionStore);
      }

      const transactionStore = await manager.insert(TransactionStoreEntity, listNewTransactionStore);

      // do a transaction to update transaction-warehouse
      // add opposite storage warehouse
      // decrease warehouse storage

      return transactionStore;
    });
  }

  async transfer(transactionList: CreateTransactionStoreDto[], userPayload: IJwtPayload) {
    return this.dataSource.transaction(async (manager) => {
      let listNewTransactionStore: TransactionStoreEntity[] = [];
      for (const transaction of transactionList) {
        const store = await this.storeService.findOne(transaction.store_id,userPayload,  manager);
        if (!store) throw new BadRequestException('Category not found');

        const newTransactionStore = this.transactionStoreRepository.create({
          ...transaction,
          price_per_unit: new Decimal(store.price),
          total_price: new Decimal(store.price).mul(transaction.amount),
          created_by: userPayload.id,
          bank_id: userPayload.bank_id,
          warehouse_id: userPayload.warehouse_id,
          transaction_status_id: TransactionStatusEnum.PENDING,
          transaction_type_id: TransactionTypeEnum.DEPOSIT,
        });
        console.log({newTransactionStore})
        listNewTransactionStore.push(newTransactionStore);
      }

      const transactionStore = await manager.insert(TransactionStoreEntity, listNewTransactionStore);

      // do a transaction to update transaction-warehouse
      // add opposite storage warehouse
      // decrease warehouse storage

      return transactionStore;
    });
  }

  findAll(dto: FindTransactionStoreDto, userPayload: IJwtPayload) {
    return this.transactionStoreRepository.findAll(dto, userPayload);
  }

  findOne(id: number) {
    return this.transactionStoreRepository.findOneBy({ id });
  }

  update(id: number, updateTransactionStoreDto: UpdateTransactionStoreDto, userPayload: IJwtPayload) {
    const transactionStore = this.transactionStoreRepository.findOneBy({ id });
  }

  updateStatusSuccess(id: number, updateTransactionStoreDto: UpdateTransactionStoreDto, userPayload: IJwtPayload) {
    const transactionStore = this.transactionStoreRepository.findOneBy({ id });
    if (!transactionStore) throw new BadRequestException('Transaction not found');

    return this.transactionStoreRepository.update(id, {
      ...updateTransactionStoreDto,
      transaction_status_id: TransactionStatusEnum.SUCCESS,
      updated_by: userPayload.id,
    });
  }

  updateStatusFailed(id: number, updateTransactionStoreDto: UpdateTransactionStoreDto, userPayload: IJwtPayload) {
    const transactionStore = this.transactionStoreRepository.findOneBy({ id });
    if (!transactionStore) throw new BadRequestException('Transaction not found');

    return this.transactionStoreRepository.update(id, {
      ...updateTransactionStoreDto,
      transaction_status_id: TransactionStatusEnum.FAILED,
      updated_by: userPayload.id,
    });
  }
}
