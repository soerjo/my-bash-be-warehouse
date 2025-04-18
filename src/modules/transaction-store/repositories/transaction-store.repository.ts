import { DataSource, EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TransactionStoreEntity } from "../entities/transaction-store.entity";
import { FindTransactionStoreDto } from "../dto/find-transaction-store.dto";
import Decimal from "decimal.js";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { getTotalByCategoryDto } from "../dto/get-total-category.dto";
import { UnitEntity } from "../../../modules/units/entities/unit.entity";
import { StoreEntity } from "../../../modules/store/entities/store.entity";

@Injectable()
export class TransactionStoreRepository extends Repository<TransactionStoreEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TransactionStoreEntity, dataSource.createEntityManager());
    }


        async findAll(dto: FindTransactionStoreDto, manager?: EntityManager) {
          const repo = manager ? manager.getRepository(TransactionStoreEntity) : this;
          const queryBuilder = repo.createQueryBuilder('transaction_store');
          queryBuilder.leftJoinAndSelect('transaction_store.transactionStatus', 'transactionStatus');
          queryBuilder.leftJoinAndSelect('transaction_store.transactionType', 'transactionType');
          queryBuilder.leftJoinAndSelect('transaction_store.warehouse', 'warehouse');

          queryBuilder.select([
            "transaction_store.id as id",
            "transaction_store.transaction_bank_id as transaction_bank_id",
            "transaction_store.created_at as created_at",
            "transaction_store.store_id as store_id",
            "transaction_store.store_name as store_name",
            "transaction_store.store_price as store_price",
            "transaction_store.amount as amount",
            "transaction_store.total_price as total_price",
            "transaction_store.fee_percent as fee_percent",
            "transaction_store.fee_price as fee_price",
            "transaction_store.final_price as final_price",
            "transaction_store.category_store_id as category_store_id",
            "transaction_store.category_name as category_name",
            "transaction_store.category_code as category_code",
            "transaction_store.unit_id as unit_id",
            "transaction_store.unit_name as unit_name",
            "transaction_store.unit_code as unit_code",
            "transaction_store.message as message",
            "transaction_store.transaction_status_id as transaction_status_id",
            "transaction_store.transaction_type_id as transaction_type_id",
            "transaction_store.bank_id as bank_id",
            "transaction_store.warehouse_id as warehouse_id",
            "transactionStatus.id as transaction_status_id",
            "transactionStatus.name as transaction_status_name",
            "transactionType.id as transaction_type_id",
            "transactionType.name as transaction_type_name",
            "warehouse.id as warehouse_id",
            "warehouse.name as warehouse_name",
          ])

          if(dto.transaction_bank_ids) {
            queryBuilder.andWhere('transaction_store.transaction_bank_id In(:...transaction_bank_ids)', { transaction_bank_ids: dto.transaction_bank_ids });
          }

          if (dto?.store_ids) {
            queryBuilder.andWhere('transaction_store.store_id In(:...store_id)', { store_id: dto.store_ids });
          }

          if (dto?.transaction_bank_id) {
            queryBuilder.andWhere('transaction_store.transaction_bank_id = :transaction_bank_id', { transaction_bank_id: dto.transaction_bank_id });
          }

          if (dto?.transaction_type_ids?.length) {
            queryBuilder.andWhere('transaction_store.transaction_type_id In(:...transaction_type_ids)', { transaction_type_ids: dto.transaction_type_ids });
          }

          if (dto?.transaction_status_ids?.length) {
            queryBuilder.andWhere('transaction_store.transaction_status_id In(:...transaction_status_ids)', { transaction_status_ids: dto.transaction_status_ids });
          }

          if (dto?.category_store_ids?.length) {
            queryBuilder.andWhere('transaction_store.category_store_id In(:...category_store_ids)', { category_store_ids: dto.category_store_ids });
          }

          if(dto?.bank_id) {
            queryBuilder.andWhere('transaction_store.bank_id = :bank_id', { bank_id: dto.bank_id });
          }

          if(dto?.warehouse_id) {
            queryBuilder.andWhere('transaction_store.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id });
          }

          if(dto?.start_date && dto?.end_date) {
            const startDate = new Date(dto.start_date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(dto.end_date);
            endDate.setHours(23, 59, 59, 999);        
      
            queryBuilder.andWhere('transaction_store.created_at BETWEEN :start_date AND :end_date', { start_date: startDate, end_date: endDate });
          } else if(dto?.start_date) {
            const startDate = new Date(dto.start_date);
            startDate.setHours(0, 0, 0, 0);

            queryBuilder.andWhere('transaction_store.created_at >= :start_date', { start_date: startDate });
          } else if(dto?.end_date) {
            const endDate = new Date(dto.end_date);
            endDate.setHours(23, 59, 59, 999);        

            queryBuilder.andWhere('transaction_store.created_at <= :end_date', { end_date: endDate });
          }
      
          dto.page = dto.page ?? 1;
          dto.take = dto.take ?? 10;
          
          queryBuilder.orderBy('transaction_store.created_at', 'DESC')
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
            
            store_price: new Decimal(data.store_price).toNumber(),
            amount: new Decimal(data.amount).toNumber(),
            total_price: new Decimal(data.total_price).toNumber(),
            fee_percent: new Decimal(data.fee_percent).toNumber(),
            fee_price: new Decimal(data.fee_price).toNumber(),
            final_price: new Decimal(data.final_price).toNumber(),
          }))
          
          return { data: processedData, meta}
        }

        async getTotalByStore(dto: getTotalByCategoryDto): Promise<{name: string, total_amount: number}[]> {
          const queryBuilderStory = this.dataSource.createQueryBuilder(StoreEntity, 'store');
          queryBuilderStory.leftJoin(CategoryEntity, 'category', 'category.id = store.category_id');
          queryBuilderStory.leftJoin(UnitEntity, 'unit', 'category.unit_id = unit.id');
          queryBuilderStory.select([
            "store.id as id",
            "store.name as name",
            "category.id as category_id",
            "category.name as category_name",
            "unit.id as unit_id",
            "unit.name as unit_name",
            "unit.code as unit_code",
          ]);
          queryBuilderStory.withDeleted()

          const queryBuilderTransaction = this.createQueryBuilder('transaction_store');
          queryBuilderTransaction.leftJoin(StoreEntity, 'story', 'transaction_store.store_id = story.id');
          queryBuilderTransaction.select([
            "story.id as id",
            "SUM(transaction_store.amount) as total_amount"
          ])
          .groupBy('story.id');

          if(dto.transaction_status_ids) {
            queryBuilderTransaction.andWhere('transaction_store.transaction_status_id In(:...transaction_status_ids)', { transaction_status_ids: dto.transaction_status_ids });
          }

          if(dto.warehouse_id) {
            queryBuilderStory.andWhere('category.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id });
            queryBuilderTransaction.andWhere('transaction_store.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id });
          }

          if(dto?.start_date) {
            const startDate = new Date(dto.start_date);
            startDate.setHours(0, 0, 0, 0);
            queryBuilderTransaction.andWhere('transaction_store.created_at >= :start_date', { start_date: startDate });
          }
      
          if(dto?.end_date) {
            const endDate = new Date(dto.end_date);
            endDate.setHours(23, 59, 59, 999);
            queryBuilderTransaction.andWhere('transaction_store.created_at <= :end_date', { end_date: endDate });
          }

          const [transaction, story] = await Promise.all([
            queryBuilderTransaction.getRawMany(), 
            queryBuilderStory.getRawMany(),
          ]);

          return story.map(data => {
            const transactionData = transaction.find(item => item.id === data.id);

            return {
              ...data, 
              total_amount: new Decimal(transactionData?.total_amount ?? 0).toNumber(),
            }
          })
        }
}
