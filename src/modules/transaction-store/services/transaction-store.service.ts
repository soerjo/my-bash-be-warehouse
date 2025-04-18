import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionStoreDto } from '../dto/create-transaction-store.dto';
import { FindTransactionStoreDto } from '../dto/find-transaction-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { TransactionStoreRepository } from '../repositories/transaction-store.repository';
import { TransactionTypeEnum } from '../../../common/constant/transaction-type.constant';
import { TransactionStatusEnum } from '../../../common/constant/transaction-status.constant';
import { StoreService } from '../../../modules/store/services/store.service';
import { TransactionStoreEntity } from '../entities/transaction-store.entity';
import { DataSource, In } from 'typeorm';
import Decimal from 'decimal.js';
import { Transactional } from 'typeorm-transactional';
import { DepositItemBulkDto, DepositItemDto } from '../dto/deposit-item.dto';
import { SellItemBulkDto, SellItemDto } from '../dto/sell-item.dto';
import { TransactionWarehouseService } from '../../../modules/transaction-warehouse/services/transaction-warehouse.service';
import { BankService } from '../../../modules/bank/services/bank.service';
import { CompleteTransactionStoreDto } from '../dto/complete-transaction.dto';
import { getTotalByCategoryDto } from '../dto/get-total-category.dto';

@Injectable()
export class TransactionStoreService {
  constructor(
    private readonly transactionStoreRepository: TransactionStoreRepository,
    private readonly transactionWarehouseService: TransactionWarehouseService,
    private readonly bankService: BankService,
    private readonly storeService: StoreService,
    private readonly dataSource: DataSource,
  ) {}

  @Transactional()
  async depositItem(dto: DepositItemDto, userPayload: IJwtPayload) {
    const store = await this.storeService.findOneByStoreId(dto.store_id, userPayload);
    if (!store) throw new BadRequestException('store not found');

    const total_price = new Decimal(store.price).mul(dto.amount);
    const fee_price = new Decimal(store.fee).mul(total_price);
    const final_price = total_price.minus(fee_price);
    const createNewDepositTrx = this.transactionStoreRepository.create({
      trx_id: dto.trx_id,
      transaction_bank_id: dto.transaction_bank_id,
      store_id: store.id,
      store_name: store.name,
      store_price: new Decimal(store.price),
      amount: dto.amount,
      total_price: total_price,
      fee_percent: store.fee,
      fee_price: fee_price,
      final_price: final_price,
      category_store_id: store.category_id,
      category_name: store.category_name,
      category_code: store.category_code,
      unit_id: store.unit_id,
      unit_name: store.unit_name,
      unit_code: store.unit_code,
      message: dto.message,
      transaction_status_id: TransactionStatusEnum.PENDING,
      transaction_type_id: TransactionTypeEnum.DEPOSIT,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    })

    await this.transactionStoreRepository.save(createNewDepositTrx);
  }

  @Transactional()
  async depositItemBulk(dto: DepositItemBulkDto, userPayload: IJwtPayload) {
    const store_ids = dto.transactions.map((item) => item.store_id);
    const storeList = await this.storeService.findOneByStoreIds(store_ids, userPayload);

    const createNewDepositTrxList: TransactionStoreEntity[] = [];
    for (const item of dto.transactions) {
      const store = storeList.find((store) => store.id === item.store_id);
      
      const total_price = new Decimal(store.price).mul(item.amount);
      const fee_price = new Decimal(store.fee).mul(total_price);
      const final_price = total_price.minus(fee_price);

      createNewDepositTrxList.push(
        this.transactionStoreRepository.create({
          trx_id: dto.trx_id,
          transaction_bank_id: item.transaction_bank_id,
          store_id: store.id,
          store_name: store.name,
          store_price: new Decimal(store.price),
          amount: item.amount,
          total_price: total_price,
          fee_percent: store.fee,
          fee_price: fee_price,
          final_price: final_price,
          category_store_id: store.category_id,
          category_name: store.category_name,
          category_code: store.category_code,
          unit_id: store.unit_id,
          unit_name: store.unit_name,
          unit_code: store.unit_code,
          message: dto.message,
          transaction_status_id: TransactionStatusEnum.PENDING,
          transaction_type_id: TransactionTypeEnum.DEPOSIT,
          bank_id: userPayload.bank_id,
          warehouse_id: userPayload.warehouse_id,
        })
      )
    }

    await this.transactionStoreRepository.save(createNewDepositTrxList);
  }

  @Transactional()
  async sellItem(dto: SellItemDto, userPayload: IJwtPayload) {
    const store = await this.storeService.findOneByStoreId(dto.store_id, userPayload);
    if (!store) throw new BadRequestException('store not found');

    const total_price = new Decimal(dto.unit_price).mul(dto.amount);
    const fee_price = new Decimal(0);
    const final_price = total_price.minus(fee_price);

    const createNewDepositTrx = this.transactionStoreRepository.create({
      trx_id: dto.trx_id,
      store_id: store.id,
      store_name: store.name,
      store_price: new Decimal(store.price),
      amount: dto.amount,
      total_price: total_price,
      fee_percent: store.fee,
      fee_price: fee_price,
      final_price: final_price,
      category_store_id: store.category_id,
      category_name: store.category_name,
      category_code: store.category_code,
      unit_id: store.unit_id,
      unit_name: store.unit_name,
      unit_code: store.unit_code,
      message: dto.message,
      transaction_status_id: TransactionStatusEnum.SUCCESS,
      transaction_type_id: TransactionTypeEnum.WITHDRAW,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    })

    await this.transactionStoreRepository.save(createNewDepositTrx);
  }

  @Transactional()
  async sellItemBulk(dto: SellItemBulkDto, userPayload: IJwtPayload) {
    const store_ids = dto.transactions.map((item) => item.store_id);
    const storeList = await this.storeService.findOneByStoreIds(store_ids, userPayload);

    const createNewDepositTrxList: TransactionStoreEntity[] = [];
    for (const item of dto.transactions) {
      const store = storeList.find((store) => store.id === item.store_id);

      const total_price = new Decimal(item.unit_price).mul(item.amount);
      const fee_price = new Decimal(0);
      const final_price = total_price.minus(fee_price);

      createNewDepositTrxList.push(
        this.transactionStoreRepository.create({
          store_id: store.id,
          store_name: store.name,
          store_price: new Decimal(store.price),
          amount: item.amount,
          total_price: total_price,
          fee_percent: store.fee,
          fee_price: fee_price,
          final_price: final_price,
          category_store_id: store.category_id,
          category_name: store.category_name,
          category_code: store.category_code,
          unit_id: store.unit_id,
          unit_name: store.unit_name,
          unit_code: store.unit_code,
          message: dto.message,
          transaction_status_id: TransactionStatusEnum.SUCCESS,
          transaction_type_id: TransactionTypeEnum.WITHDRAW,
          bank_id: userPayload.bank_id,
          warehouse_id: userPayload.warehouse_id,
        })
      )
    }

    await this.transactionStoreRepository.save(createNewDepositTrxList);
  }

  async deposit(transactionList: CreateTransactionStoreDto[], userPayload: IJwtPayload) {
    return this.dataSource.transaction(async (manager) => {
      let listNewTransactionStore: TransactionStoreEntity[] = [];
      for (const transaction of transactionList) {
        const store = await this.storeService.findOne(transaction.store_id,userPayload,  manager);
        if (!store) throw new BadRequestException('Category not found');

        const newTransactionStore = this.transactionStoreRepository.create({
          ...transaction,
          store_price: new Decimal(store.price),
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

  // async transfer(transactionList: CreateTransactionStoreDto[], userPayload: IJwtPayload) {
  //   return this.dataSource.transaction(async (manager) => {
  //     let listNewTransactionStore: TransactionStoreEntity[] = [];
  //     for (const transaction of transactionList) {
  //       const store = await this.storeService.findOne(transaction.store_id,userPayload,  manager);
  //       if (!store) throw new BadRequestException('Category not found');

  //       const newTransactionStore = this.transactionStoreRepository.create({
  //         ...transaction,
  //         store_price: new Decimal(store.price),
  //         total_price: new Decimal(store.price).mul(transaction.amount),
  //         created_by: userPayload.id,
  //         bank_id: userPayload.bank_id,
  //         warehouse_id: userPayload.warehouse_id,
  //         transaction_status_id: TransactionStatusEnum.PENDING,
  //         transaction_type_id: TransactionTypeEnum.DEPOSIT,
  //       });
  //       console.log({newTransactionStore})
  //       listNewTransactionStore.push(newTransactionStore);
  //     }

  //     const transactionStore = await manager.insert(TransactionStoreEntity, listNewTransactionStore);

  //     // do a transaction to update transaction-warehouse
  //     // add opposite storage warehouse
  //     // decrease warehouse storage

  //     return transactionStore;
  //   });
  // }

  findAll(dto: FindTransactionStoreDto, userPayload: IJwtPayload) {
    return this.transactionStoreRepository.findAll(dto, userPayload);
  }

  findOne(id: string) {
    return this.transactionStoreRepository.findOneBy({ id });
  }

  async getBulkByTransactionBankIds(transaction_bank_ids: string[]) {
    const {data} = await this.transactionStoreRepository.findAll({ transaction_bank_ids });
    return data;
  }

  @Transactional()
  async updateStatusSuccess(updateTransactionStoreDto: CompleteTransactionStoreDto, userPayload: IJwtPayload) {
    const listTransactionStore = await this.transactionStoreRepository.find({
      where: [
        { id: In(updateTransactionStoreDto.ids) },
        ...(updateTransactionStoreDto.transaction_bank_id
          ? [{ transaction_bank_id: In(updateTransactionStoreDto.transaction_bank_id) }]
          : []),
      ],
    })


    listTransactionStore.forEach((item) => {
      if (item.transaction_status_id !== TransactionStatusEnum.PENDING) {
        throw new BadRequestException(`transaction id: ${item.id} already success or failed`);
      }
      
      item.transaction_status_id = TransactionStatusEnum.SUCCESS;
    });

    const successListTransactionStore = await this.transactionStoreRepository.save(listTransactionStore);

    for (const successTransactionStore of successListTransactionStore) {
        await this.transactionWarehouseService.createTransaction(successTransactionStore, userPayload);
    }

    // should do sync to bank-service transaction is success
    await this.bankService.completeBankTransactionDetail({
      transaction_id: listTransactionStore.map(data => data.transaction_bank_id),
    }, userPayload.token);
  }

  @Transactional()
  async updateStatusFailed(updateTransactionStoreDto: CompleteTransactionStoreDto, userPayload: IJwtPayload) {
    const listTransactionStore = await this.transactionStoreRepository.find({
      where: [
        { id: In(updateTransactionStoreDto.ids) },
        ...(updateTransactionStoreDto.transaction_bank_id
          ? [{ transaction_bank_id: In(updateTransactionStoreDto.transaction_bank_id) }]
          : []),
      ],
    });

    listTransactionStore.forEach((item) => {
      if (item.transaction_status_id !== TransactionStatusEnum.PENDING) {
        throw new BadRequestException(`transaction id: ${item.id} already success or failed`);
      }

      item.transaction_status_id = TransactionStatusEnum.FAILED;
    });

    await this.transactionStoreRepository.save(listTransactionStore);

    // should do sync to bank-service transaction is failed
    // await this.bankService.cancleBankTransaction({
    //   transaction_id: listTransactionStore.map(data => data.transaction_bank_id),
    // }, userPayload.token);  
  }

  getTotalByStore(dto: getTotalByCategoryDto, userPayload: IJwtPayload) {
    return this.transactionStoreRepository.getTotalByStore({
      ...dto, 
      warehouse_id: userPayload.warehouse_id ?? dto.warehouse_id,
    });
  }
}
