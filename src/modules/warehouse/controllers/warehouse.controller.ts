import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { WarehouseService } from '../services/warehouse.service';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { FindWarehouseDto } from '../dto/finc-warehouse.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { FindBulkDto } from '../dto/find-bulk.dto';
import { RoleEnum } from '../../../common/constant/role.constant';
import { Roles } from '../../../common/decorator/role.decorator';

@ApiTags('warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto, userPayload);
  }

  @Delete('failed/:trx_id')
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  faildCreat(@Param('trx_id') trx_id: string) {
    return this.warehouseService.failedCreate(trx_id);
  }

  @Get()
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindWarehouseDto) {
    return this.warehouseService.findAll(dto, userPayload);
  }

  @Get(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Get('bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  getBulk(@Query() dto: FindBulkDto) {
    return this.warehouseService.getBulk(dto.ids);
  }

  @Patch(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto, userPayload);
  }

  @Delete(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN ])
  remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
    return this.warehouseService.remove(+id, userPayload);
  }
}
