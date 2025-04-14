import { DataSource, EntityManager, Repository } from "typeorm";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";
import { Injectable } from "@nestjs/common";
import { StoreEntity } from "../entities/store.entity";
import { FindStoreDto } from "../dto/find-store.dto";

@Injectable()
export class StoreRepository extends Repository<StoreEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(StoreEntity, dataSource.createEntityManager());
    }


        async findAll(dto: FindStoreDto, manager?: EntityManager) {
            const repo = manager ? manager.getRepository(StoreEntity) : this;
            const queryBuilder = repo.createQueryBuilder('store');
            queryBuilder.leftJoin('store.category', 'category');
            queryBuilder.leftJoin('category.unit', 'unit');
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
              
            ])
        
            if(dto.bank_id) {
              queryBuilder.andWhere('store.bank_id = :bank_id OR store.bank_id is null', { bank_id: dto.bank_id} );
            }
        
            if(dto.warehouse_id) {
              queryBuilder.andWhere('store.warehouse_id = :warehouse_id OR store.warehouse_id is null', { warehouse_id: dto.warehouse_id} );
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
              price: data.price ? Number(data.price) : 0,
            }))
            
            return { data: processedData, meta}
          }
}
