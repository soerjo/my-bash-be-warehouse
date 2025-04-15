import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { FindStoreDto } from '../dto/find-store.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { StoreRepository } from '../repositories/store.repository';
import { CategoryService } from '../../../modules/category/services/category.service';
import { EntityManager, In } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly categoryService: CategoryService,
  
  ) {}

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

    const newStore = this.storeRepository.create({
      name: createStoreDto.name,
      price: createStoreDto.price,
      created_by: userPayload.id,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
      category_id: createStoreDto.category_id,
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

  async update(id: number, updateStoreDto: UpdateStoreDto, userPayload: IJwtPayload) {
    const store = await this.findOne(id, userPayload);
    if (!store) throw new BadRequestException('Store not found');

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
