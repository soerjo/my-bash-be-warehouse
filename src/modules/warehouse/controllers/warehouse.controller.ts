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

@ApiTags('warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto, userPayload);
  }

  @Delete('failed/:trx_id')
  faildCreat(@Param('trx_id') trx_id: string) {
    return this.warehouseService.failedCreate(trx_id);
  }

  @Get()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindWarehouseDto) {
    return this.warehouseService.findAll(dto, userPayload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Get('bulk')
  getBulk(@Query() dto: FindBulkDto) {
    return this.warehouseService.getBulk(dto.ids);
  }

  @Patch(':id')
  update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto, userPayload);
  }

  @Delete(':id')
  remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
    return this.warehouseService.remove(+id, userPayload);
  }
}
