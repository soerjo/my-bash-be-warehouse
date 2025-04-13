import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FindCategoryDto } from '../dto/find-category.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CategoryRepository } from '../repositories/category.repository';
import { In } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto, userPayload: IJwtPayload) {
    const category = await this.categoryRepository.findOne({
      where: {
        name: dto.name,
        ...(dto.code ? { code: dto.code } : {}),
        bank_id: userPayload.bank_id,
        warehouse_id: userPayload.warehouse_id,
      }
    })
    if(category) throw new BadRequestException('Category already exists');

    const newCategory = this.categoryRepository.create({
      ...dto,
      code: dto.code ?? dto.name.toUpperCase(),
      created_by: userPayload.id,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    });
    
    return this.categoryRepository.save(newCategory);
  }

  findAll(dto: FindCategoryDto, userPayload: IJwtPayload) {
    return this.categoryRepository.findAll({
      ...dto,
      bank_id: userPayload.bank_id,
      warehouse_id: userPayload.warehouse_id,
    });
  }

  findOne(id: number, userPayload?: IJwtPayload) {
    return this.categoryRepository.findOne({ 
      where: { 
        id,
        bank_id: userPayload?.bank_id,
        warehouse_id: userPayload?.warehouse_id,
      } 
    });
  }

  getBulkByIds(ids: number[]) {
    return this.categoryRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, userPayload: IJwtPayload) {
    const category = await this.findOne(id, userPayload);
    if(!category) throw new BadRequestException('Unit not found');
    return this.categoryRepository.update(id, {
      ...category,
      ...updateCategoryDto,
      updated_by: userPayload.id,
    });
  }

  async remove(id: number, userPayload: IJwtPayload) {
    const unit = await this.findOne(id);
    if(!unit) throw new BadRequestException('Unit not found');

    unit.deleted_by = userPayload.id;
    return this.categoryRepository.softRemove(unit)
  }
}
