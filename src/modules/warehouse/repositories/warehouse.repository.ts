import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Repository } from "typeorm";
import { WarehouseEntity } from "../entities/warehouse.entity";
import { FindWarehouseDto } from "../dto/finc-warehouse.dto";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";

@Injectable()
export class WarehouseRepository extends Repository<WarehouseEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(WarehouseEntity, dataSource.createEntityManager());
    }

    async findAll(dto: FindWarehouseDto, userPayload: IJwtPayload, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(WarehouseEntity) : this;
        const queryBuilder = repo.createQueryBuilder('warehouse');
        // queryBuilder.select([
        //   'warehouse.id as id',
        // ])
    
        // if(![RoleEnum.SUPER_ADMIN, RoleEnum.SYSTEM_ADMIN].includes(userPayload.role_id)) {
        //   queryBuilder.andWhere('user.bank_id = :bank_id', { bank_id: userPayload.bank_id });
        // }
    
        // if(dto.username) {
        //   queryBuilder.andWhere('user.username ilike :username', { username: `%${dto.username}%` });
        // }
    
        // if(dto.email) {
        //   queryBuilder.andWhere('user.email ilike :email', { email: `%${dto.email}%` });
        // }
    
        // if(dto.role_id) {
        //   queryBuilder.andWhere('user.role_id = :role_id', { role_id: dto.role_id });
        // }
    
        queryBuilder.orderBy('warehouse.created_at', 'DESC')
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
        //   balance: data.balance ? parseFloat(data.balance) : 0,
        //   full_name: data.full_name ? decrypt(data.full_name)  : null,
        //   name: data.name ? decrypt(data.name) : null,
        //   identity_number: data.identity_number ? decrypt(data.identity_number)  : null,
        //   province: data.province ? decrypt(data.province) : null,
        //   regency: data.regency ? decrypt(data.regency)  : null,
        //   district: data.district ? decrypt(data.district) : null,
        //   village: data.village ? decrypt(data.village)  : null,
        //   address: data.address ? decrypt(data.address)  : null,
        //   postal_code: data.postal_code ? decrypt(data.postal_code)  : null,
        //   phone: data.phone ? decrypt(data.phone)  : null,
        }))
        
        return { data: processedData, meta}
      }
}