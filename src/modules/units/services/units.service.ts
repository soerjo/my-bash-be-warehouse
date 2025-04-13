import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindUnitDto } from '../dto/find-unit.dto';
import { UnitsRepository } from '../repositories/unit.repository';
import { In } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(private readonly unitRepository: UnitsRepository) {}
  
  async create(dto: CreateUnitDto, userPayload: IJwtPayload) {
    const unit = await this.unitRepository.findOne({
      where: {
        name: dto.name,
        bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id,
      }
    })
    if(unit) throw new BadRequestException('Unit already exists');
    
    const newUnit = this.unitRepository.create({
      name: dto.name,
      code: dto.code ?? dto.name.split(" ").join("_").toUpperCase(),
      description: dto.description,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
      created_by: userPayload.id,
    });

    return this.unitRepository.save(newUnit);
  }

  findAll(dto: FindUnitDto, userPayload?: IJwtPayload) {
    return this.unitRepository.findAll(dto);
  }

  findOne(id: number, userPayload?: IJwtPayload) {
    return this.unitRepository.findOne({ 
      where: { 
        id, 
        bank_id: userPayload.bank_id, 
        warehouse_id: userPayload.warehouse_id 
      } 
    });
  }

  getBulks(ids: number[]) {
    return this.unitRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updateUnitDto: UpdateUnitDto, userPayload?: IJwtPayload) {
    const unit = await this.findOne(id, userPayload);
    if(!unit) throw new BadRequestException('Unit not found');
    await this.unitRepository.update(id, {
      ...unit,
      ...updateUnitDto,
      updated_by: userPayload.id,
    });
  }

  async remove(id: number, userPayload: IJwtPayload) {
    const unit = await this.findOne(id);
    if(!unit) throw new BadRequestException('Unit not found');

    unit.deleted_by = userPayload.id;
    return this.unitRepository.softRemove(unit)
  }
}
