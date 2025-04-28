import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { FindStoreDto } from '../dto/find-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { StoreRepository } from '../repositories/store.repository';
import { CategoryService } from '../../../modules/category/services/category.service';
import { EntityManager, In } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';
import { Transactional } from 'typeorm-transactional';
import { FeeService } from '../../../modules/fee/services/fee.service';
import Decimal from 'decimal.js';
import { FeeEntity } from '../../../modules/fee/entities/fee.entity';
import { StoreLogsRepository } from '../repositories/store-logs.repository';
import { FindLogsStoreDto } from '../dto/find-log-store.dto';
import { ResponseFindStoreByIdDto } from '../dto/respose-find-store-by-id.dto';
import { TransactionStoreService } from '../../../modules/transaction-store/services/transaction-store.service';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly storeLogsRepository: StoreLogsRepository,
    private readonly categoryService: CategoryService,
    private readonly feeService: FeeService,

    @Inject(forwardRef(() => TransactionStoreService))
    private readonly transactionStoreService: TransactionStoreService,
  
  ) {}

  @Transactional()
  async create(createStoreDto: CreateStoreDto, userPayload: IJwtPayload) {
    const store = await this.storeRepository.findOne({
      where: {
        category_id: createStoreDto.category_id, 
        name: createStoreDto.name,
        bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id,
      }
    });
    if(store) throw new BadRequestException('Store already exists');

    const category = await this.categoryService.findOne(createStoreDto.category_id);
    if(!category) throw new BadRequestException('Category not found');

    let fee: FeeEntity;
    if(createStoreDto.is_custom_fee) {
      fee = await this.feeService.create({
        percentage: new Decimal(createStoreDto.custom_fee),
        bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id,
      })
    }

    const newStoreData = this.storeRepository.create({
      name: createStoreDto.name,
      price: createStoreDto.price,
      created_by: userPayload.id,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
      category_id: createStoreDto.category_id,
      fee_id: fee?.id,
    });

    const newStore = await this.storeRepository.save(newStoreData);

    fee.store_id = newStore.id;
    await fee.save()
  }

  findAll(dto: FindStoreDto, userPayload: IJwtPayload) {
    return this.storeRepository.findAll({
      ...dto,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    });
  }

  async findOneByStoreId(store_id: number, userPayload: IJwtPayload) {
    const store = await this.storeRepository.findByStoreId([store_id], userPayload)
    return store[0];
  }

  findOneByStoreIds(store_ids: number[], userPayload: IJwtPayload) {
    return this.storeRepository.findByStoreId(store_ids, userPayload);
  }

  findOne(id: number, userPayload?: IJwtPayload, manager?: EntityManager) {
    const repositories = manager ? manager.getRepository(StoreEntity) : this.storeRepository;
    return repositories.findOne({ 
      where: { 
        id, 
        bank_id: userPayload?.bank_id, 
        warehouse_id: userPayload?.warehouse_id,
      },
      ...(!userPayload ? {relations: ['category.unit']} : {})
    });
  }

  getLogs(id: number, dto: FindLogsStoreDto, userPayload?: IJwtPayload) {
    return this.storeLogsRepository.findAll({
      ...dto,
      store_id: id,
      bank_id: userPayload?.bank_id,
      warehouse_id: userPayload?.warehouse_id,
    })
  }

  @Transactional()
  async update(id: number, updateStoreDto: UpdateStoreDto, userPayload: IJwtPayload) {
    const store = await this.findOneByStoreId(id, userPayload)
    if (!store) throw new BadRequestException('Store not found');
    
    const IsUpdate = 
    (updateStoreDto.name && updateStoreDto.name != store.name) ||
    (updateStoreDto?.price && !new Decimal(updateStoreDto?.price ?? 0).equals(store.store_price)) ||
    (updateStoreDto?.custom_fee && !new Decimal(updateStoreDto?.custom_fee ?? 0).equals(store.fee)) ||
    (updateStoreDto.category_id && updateStoreDto.category_id != store.category_id);

    if(!IsUpdate) return;

    let fee: FeeEntity;
    if(store.fee_id && updateStoreDto.is_custom_fee) {
      fee = await this.feeService.update({
        store_id: store.id,
        percentage: updateStoreDto.custom_fee
      }, userPayload )
    }

    if(!store.fee_id && updateStoreDto.is_custom_fee) {
      fee = await this.feeService.create({
        percentage: new Decimal(updateStoreDto.custom_fee),
        bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id,
        store_id: store.id,
      })
      store.fee_id = fee.id;
    }

    if(updateStoreDto.is_default_fee) {
      await this.feeService.hardDelete(store.fee_id)
      store.fee_id = null;
    }

    await this.createStoreLogs(store, updateStoreDto, userPayload);

    delete updateStoreDto.is_custom_fee
    delete updateStoreDto.is_default_fee
    delete updateStoreDto.custom_fee

    await this.storeRepository.update(id, {
      name: store.name,
      price: store.price,
      fee_id: store.fee_id,
      category_id: store.category_id,
      // ...store,
      ...updateStoreDto,
      updated_by: userPayload?.id,
    });

    const transactionBankId = await this.transactionStoreService.SyncTransactionStore(id, userPayload);
    return transactionBankId;
  }



  async createStoreLogs(store: ResponseFindStoreByIdDto, updateStoreDto: UpdateStoreDto, userPayload: IJwtPayload) {
    const last_logs_id = await this.storeLogsRepository.findOne({
      where: {
        store_id: store.id,
      }, 
      order: {
        created_at: 'DESC'
      }
    });

    const createStoreLogs = this.storeLogsRepository.create({
      last_logs_id: last_logs_id?.id,
      store_id: store.id,
      name: updateStoreDto.name && updateStoreDto.name != store.name ? store.name : null,
      price: updateStoreDto?.price && !new Decimal(updateStoreDto?.price ?? 0).equals(store.store_price) ? new Decimal(store.store_price).toNumber() : null,
      fee: updateStoreDto?.custom_fee && !new Decimal(updateStoreDto?.custom_fee ?? 0).equals(store.fee) ? new Decimal(store.fee).toNumber() : null,
      bank_id: store.bank_id,
      warehouse_id: store.warehouse_id,
      category_id: updateStoreDto.category_id && updateStoreDto.category_id != store.category_id ? store.category_id : null,
      created_by: userPayload.id,
    })

    await this.storeLogsRepository.save(createStoreLogs);
  }

  async remove(id: number, userPayload: IJwtPayload) {
    const store = await this.findOne(id);
    if (!store) throw new BadRequestException('Store not found');

    store.deleted_by = userPayload.id;
    return this.storeRepository.softRemove(store);
  }
}
