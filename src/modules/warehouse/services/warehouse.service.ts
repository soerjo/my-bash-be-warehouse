import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import { FindWarehouseDto } from '../dto/finc-warehouse.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { In } from 'typeorm';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  async create(dto: CreateWarehouseDto, userPayload: IJwtPayload) {
    const warehouse = await this.warehouseRepository.findOne({
      where: [
        { name: dto.name },
        ...(dto.code? [{ code: dto.code.split(' ').join('_') }] : [])
      ],
    });
    if(warehouse) throw new BadRequestException('Warehouse already exists');

    const newWarehouse = this.warehouseRepository.create({
      ...dto,
      code: dto.code || dto.name.split(' ').join('_').toUpperCase(),
      created_by: userPayload.id,
    });
    return this.warehouseRepository.save(newWarehouse);
  }

  async failedCreate(trx_id: string) {
    const warehouse = await this.warehouseRepository.findOne({ where: { trx_id } });
    if(!warehouse) throw new BadRequestException('Warehouse trx not found');

    return this.warehouseRepository.remove(warehouse);
  }

  findAll(dto: FindWarehouseDto, userPayload: IJwtPayload) {
    return this.warehouseRepository.findAll(dto, userPayload);
  }

  findOne(id: number) {
    return this.warehouseRepository.findOneBy({ id });
  }

  getBulk(ids: number[]) {
    return this.warehouseRepository.findBy({ id: In(ids) });
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto, userPayload: IJwtPayload) {
    const warehouse = await this.findOne( id );
    if(!warehouse) throw new BadRequestException('Warehouse not found');

    return this.warehouseRepository.update(id, {
      ...warehouse,
      ...updateWarehouseDto,
      updated_by: userPayload.id,
    });
  }

  async remove(id: number, userPayload: IJwtPayload) {
    const warehouse = await this.findOne( id );
    if(!warehouse) throw new BadRequestException('Warehouse not found');

    warehouse.deleted_by = userPayload.id;
    return this.warehouseRepository.softRemove(warehouse);
  }
}
