import { DataSource, EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { StoreEntity } from "../entities/store.entity";
import { FindStoreDto } from "../dto/find-store.dto";
import { FeeEntity } from "src/modules/fee/entities/fee.entity";
import Decimal from "decimal.js";

@Injectable()
export class StoreRepository extends Repository<StoreEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(StoreEntity, dataSource.createEntityManager());
    }


        async findAll(dto: FindStoreDto, manager?: EntityManager) {
            const repo = manager ? manager.getRepository(StoreEntity) : this;
            const queryBuilder = repo.createQueryBuilder('store');
            queryBuilder.leftJoinAndSelect('store.category', 'category');
            queryBuilder.leftJoinAndSelect('category.unit', 'unit');
            queryBuilder.leftJoinAndSelect('store.fee', 'main_fee');
            queryBuilder.leftJoinAndSelect(FeeEntity, 'default_fee', 'default_fee.store_id IS NULL');

            queryBuilder.select([
              'store.id as id',
              'store.name as name',
              'category.id as category_id',
              'category.name as category_name',
              'category.code as category_code',
              'category.description as category_description',
              'store.price as price',
              'unit.id as unit_id',
              'unit.name as unit_name',
              'unit.code as unit_code',
              `
              CASE 
                WHEN store.fee_id IS NULL THEN true
                ELSE false
              END as is_default_fee
              `,
              `
              CASE 
                WHEN store.fee_id IS NOT NULL THEN main_fee.percentage
                ELSE default_fee.percentage
              END as fee
              `,
            ])

            if(dto.name) {
              queryBuilder.andWhere('store.name ILIKE :name', { name: `%${dto.name}%` });
            }

            if(dto.category_id) {
              queryBuilder.andWhere('store.category_id = :category_id', { category_id: dto.category_id });
            }
        
            if(dto.bank_id) {
              queryBuilder.andWhere('store.bank_id = :bank_id', { bank_id: dto.bank_id} );
              queryBuilder.andWhere('default_fee.bank_id = :bank_id', { bank_id: dto.bank_id} );
            }
        
            if(dto.warehouse_id) {
              queryBuilder.andWhere('store.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id } );
              queryBuilder.andWhere('default_fee.warehouse = :warehouse_id', { warehouse_id: dto.warehouse_id });
            }
        
            queryBuilder.orderBy('store.created_at', 'DESC')
            queryBuilder.skip((dto.page - 1) * dto.take).take(dto.take)
          
            const queryItemCount = queryBuilder.getCount()
            const queryUser = queryBuilder.getRawMany()
            const [itemCount, rawData] = await Promise.all([queryItemCount, queryUser])
        
            const meta = {
              page: dto?.page,
              offset: dto?.take,
              itemCount,
              pageCount: Math.ceil(itemCount / dto?.take) ? Math.ceil(itemCount / dto?.take) : 0,
            };
        
            const processedData = rawData.map(data => ({
              ...data, 
              price: new Decimal(data.price).toNumber(),
              fee: new Decimal(data.fee).toNumber(),
            }))
            
            return { data: processedData, meta}
          }
}
