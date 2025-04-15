import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly categoryService: CategoryService,
    private readonly feeService: FeeService,
  
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
        store_id: store.id,
      })
    }

    const newStore = this.storeRepository.create({
      name: createStoreDto.name,
      price: createStoreDto.price,
      created_by: userPayload.id,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
      category_id: createStoreDto.category_id,
      fee_id: fee?.id,
    });

    return this.storeRepository.save(newStore);
  }

  findAll(dto: FindStoreDto, userPayload: IJwtPayload) {
    return this.storeRepository.findAll({
      ...dto,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    });
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
      // relations: ['category.unit'], 
      
    });
  }

  findByIds(ids: number[], userPayload?: IJwtPayload, manager?: EntityManager) {
    const repositories = manager ? manager.getRepository(StoreEntity) : this.storeRepository;
    return repositories.find({ 
      where: { 
          id: In(ids),
          bank_id: userPayload?.bank_id,
          warehouse_id: userPayload?.warehouse_id,
        }, 
      relations: ['category.unit'] 
    });
  }

  @Transactional()
  async update(id: number, updateStoreDto: UpdateStoreDto, userPayload: IJwtPayload) {
    const store = await this.findOne(id, userPayload);
    if (!store) throw new BadRequestException('Store not found');

    let fee: FeeEntity;
    if(store.fee_id && updateStoreDto.is_custom_fee) {
      fee = await this.feeService.update({
        id: store.fee_id,
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

    delete updateStoreDto.is_custom_fee
    delete updateStoreDto.is_default_fee
    delete updateStoreDto.custom_fee

    await this.storeRepository.update(id, {
      ...store,
      ...updateStoreDto,
      updated_by: userPayload?.id,
    });
  }

  async remove(id: number, userPayload: IJwtPayload) {
    const store = await this.findOne(id);
    if (!store) throw new BadRequestException('Store not found');

    store.deleted_by = userPayload.id;
    return this.storeRepository.softRemove(store);
  }
}
