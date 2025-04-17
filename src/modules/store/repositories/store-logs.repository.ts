import { DataSource, EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { FindStoreDto } from "../dto/find-store.dto";
import { FeeEntity } from "../../../modules/fee/entities/fee.entity";
import Decimal from "decimal.js";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";
import { ResponseFindStoreByIdDto } from "../dto/respose-find-store-by-id.dto";
import { MetaPaginationDto } from "../../../common/dto/meta-paginatio.dto";
import { StoreLogEntity } from "../entities/store-logs.entity";
import { FindLogsStoreDto } from "../dto/find-log-store.dto";

@Injectable()
export class StoreLogsRepository extends Repository<StoreLogEntity> {
  constructor(private readonly dataSource: DataSource) {
      super(StoreLogEntity, dataSource.createEntityManager());
  }
  
  async findAll(dto: FindLogsStoreDto, manager?: EntityManager): Promise<{ data: ResponseFindStoreByIdDto [], meta: MetaPaginationDto}> {
      const repo = manager ? manager.getRepository(StoreLogEntity) : this;
      const queryBuilder = repo.createQueryBuilder('store_logs');
      queryBuilder.leftJoinAndSelect('store_logs.category', 'category');
      queryBuilder.leftJoinAndSelect('category.unit', 'unit');

      queryBuilder.select([
        'store_logs.id as id',
        'store_logs.last_logs_id as last_logs_id',
        'store_logs.store_id as store_id',
        'store_logs.name as name',
        'category.id as category_id',
        'category.name as category_name',
        // 'category.code as category_code',
        // 'category.description as category_description',
        'store_logs.price as price',
        // 'unit.id as unit_id',
        // 'unit.name as unit_name',
        // 'unit.code as unit_code',
        `store_logs.fee as fee`,
        'store_logs.created_at as created_at',
      ]);
      
      queryBuilder.where('store_logs.store_id = :store_id', { store_id: dto.store_id });

      if(dto.name) {
        queryBuilder.andWhere('store_logs.name ILIKE :name', { name: `%${dto.name}%` });
      }

      if(dto.category_id) {
        queryBuilder.andWhere('store_logs.category_id = :category_id', { category_id: dto.category_id });
      }
  
      if(dto.bank_id) {
        queryBuilder.andWhere('store_logs.bank_id = :bank_id', { bank_id: dto.bank_id} );
      }
  
      if(dto.warehouse_id) {
        queryBuilder.andWhere('store_logs.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id } );
      }

      if(dto?.start_date && dto?.end_date) {
        const startDate = new Date(dto.start_date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dto.end_date);
        endDate.setHours(23, 59, 59, 999);        
  
        queryBuilder.andWhere('store_logs.created_at BETWEEN :start_date AND :end_date', { start_date: startDate, end_date: endDate });
      } else if(dto?.start_date) {
        const startDate = new Date(dto.start_date);
        startDate.setHours(0, 0, 0, 0);

        queryBuilder.andWhere('store_logs.created_at >= :start_date', { start_date: startDate });
      } else if(dto?.end_date) {
        const endDate = new Date(dto.end_date);
        endDate.setHours(23, 59, 59, 999);        

        queryBuilder.andWhere('store_logs.created_at <= :end_date', { end_date: endDate });
      }
  
      queryBuilder.orderBy('store_logs.created_at', 'DESC')
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
  
      const processedData = rawData.map(data => {

        return {
          ...data,
          price: data.price ? new Decimal(data.price).toNumber() : null, 
          fee: data.fee ? new Decimal(data.fee).toNumber() : null,
        }
      })
      
      return { data: processedData, meta}
    }
}
