import { DataSource, Repository } from "typeorm";
import { FeeEntity } from "../entities/fee.entity";
import { FindFeeDto } from "../dto/find-fee.dto";
import { Injectable } from "@nestjs/common";
import Decimal from "decimal.js";
import { StoreEntity } from "../../../modules/store/entities/store.entity";

@Injectable()
export class FeeRepository  extends Repository<FeeEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(FeeEntity, dataSource.createEntityManager());
    }

    async findAll(dto: FindFeeDto) {
        const queryBuilder = this.createQueryBuilder('fee');

        queryBuilder.leftJoinAndSelect('fee.warehouse', 'warehouse')
        queryBuilder.leftJoinAndSelect(StoreEntity, 'store', 'store.id = fee.store_id')

        queryBuilder.where("fee.store_id IS NULL");

        if(dto.warehouse_id) {
          queryBuilder.andWhere('fee.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id });
        }

        queryBuilder.orderBy('fee.created_at', 'DESC')
        queryBuilder.offset((dto.page - 1) * dto.take).limit(dto.take)
      
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
          // ...data, 
          "id": 1,
          // "store_id": data.fee_store_id,
          "store_name": data.store_name,
          "percentage": new Decimal(data.fee_percentage).toNumber(),
          "warehouse_name": (data.fee_bank_id && data.fee_warehouse_id) ? data.warehouse_name : "System Fee",
          "bank_id": (data.fee_bank_id && data.fee_warehouse_id) ? data.fee_bank_id : null,
          "warehouse_id": data.fee_warehouse_id,
        }))
        
        return { data: processedData, meta}
    }
}