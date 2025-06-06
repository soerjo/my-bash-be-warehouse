import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateFeeDto } from '../dto/update-fee.dto';
import { FeeRepository } from '../repositories/fee.repository';
import { IsNull,  } from 'typeorm';
import Decimal from 'decimal.js';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindFeeDto } from '../dto/find-fee.dto';
import { FeeEntity } from '../entities/fee.entity';

@Injectable()
export class FeeService {
  constructor(
    private readonly feeRepository: FeeRepository,
  ) {}

  create(dto: Partial<FeeEntity>, userPayload?: IJwtPayload){
    const fee = this.feeRepository.create({
      ...dto,
      created_by: userPayload?.id,
    });
    return this.feeRepository.save(fee);
  }

  async getAllFee(dto: FindFeeDto, userPayload?: IJwtPayload) {
    const { data, meta } = await this.feeRepository.findAll({
      ...dto, 
      warehouse_id: userPayload?.warehouse_id
    });

    return { data, meta } 
  }

  async findOne(userPayload: IJwtPayload, warehouse_id?: number) {
    const fee = await this.feeRepository.findOne({
      where: {
        // bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id ?? warehouse_id,
        store_id: IsNull(),
      }
    })

    if(!fee) throw new BadRequestException('Fee not found');

    return {percentage: fee.percentage.toNumber()};
  }

  async update(updateFeeDto: UpdateFeeDto, userPayload: IJwtPayload) {
    const fee = await this.feeRepository.findOne({
      where: {
        ...(updateFeeDto.id ? { id: updateFeeDto.id } : {}),
        ...(userPayload.warehouse_id ? { warehouse_id: userPayload.warehouse_id } : {}),
        store_id: updateFeeDto.store_id ?? IsNull(),
      }
    })
    if(!fee) throw new BadRequestException('Fee not found');

    fee.percentage = new Decimal(updateFeeDto.percentage);
    fee.updated_by = userPayload.id;

    return this.feeRepository.save(fee);
  }

  async hardDelete(id: number) {
    const fee = await this.feeRepository.findOne({ where: { id } })

    if(!fee) throw new BadRequestException('Fee not found');

    return this.feeRepository.delete(fee.id);
  }

}
