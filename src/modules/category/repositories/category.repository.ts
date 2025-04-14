import { DataSource, EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CategoryEntity } from "../entities/category.entity";
import { FindCategoryDto } from "../dto/find-category.dto";

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(CategoryEntity, dataSource.createEntityManager());
    }


        async findAll(dto: FindCategoryDto, manager?: EntityManager) {
            const repo = manager ? manager.getRepository(CategoryEntity) : this;
            const queryBuilder = repo.createQueryBuilder('category');
            queryBuilder.leftJoin('category.unit', 'unit')
            queryBuilder.select([
              'category.id as id',
              'category.name as name',
              'category.code as code',
              'category.description as description',
              'unit.id as unit_id',
              'unit.name as unit_name',
            ])

            if(dto.name) {
              queryBuilder.andWhere('category.name ILIKE :name', { name: `%${dto.name}%` })
            }

            if(dto.bank_id) {
              queryBuilder.andWhere('category.bank_id = :bank_id', { bank_id: dto.bank_id })
            }
        
            if(dto.warehouse_id) {
              queryBuilder.andWhere('category.warehouse_id = :warehouse_id', { warehouse_id: dto.warehouse_id })
            }

            queryBuilder.orderBy('category.created_at', 'DESC')
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
            }))
            
            return { data: processedData, meta}
          }
}
