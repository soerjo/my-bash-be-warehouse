import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { FeeService } from '../services/fee.service';
import { CreateFeeDto } from '../dto/create-fee.dto';
import { UpdateFeeDto } from '../dto/update-fee.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorator/role.decorator';
import { RoleEnum } from '../../../common/constant/role.constant';
import { FindFeeDto } from '../dto/find-fee.dto';
import { getWarehouseFeeDto } from '../../../modules/store/dto/warehouse-fee.dto';

@ApiTags('fee')
@Controller('fee')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get('')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  getAllFee(@Query() dto: FindFeeDto, @CurrentUser() userPayload: IJwtPayload,) {
    return this.feeService.getAllFee(dto, userPayload);
  }

  // @Get('system')
  // @Roles([ RoleEnum.SYSTEM_ADMIN ])
  // getSystemFee() {
  //   return this.feeService.getSysmtemFee();
  // }

  // @Patch('system')
  // @Roles([ RoleEnum.SYSTEM_ADMIN ])
  // updateSystemFee(@CurrentUser() userPayload: IJwtPayload, @Body() updateFeeDto: UpdateFeeDto) {
  //   return this.feeService.updateSystemFee(updateFeeDto, userPayload);
  // }

  @Get('warehouse')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findOne(@CurrentUser() userPayload: IJwtPayload, @Query() {warehouse_id }: getWarehouseFeeDto) {
    return this.feeService.findOne(userPayload, warehouse_id );
  }

  @Patch('warehouse')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  update(@CurrentUser() userPayload: IJwtPayload, @Body() updateFeeDto: UpdateFeeDto) {
    return this.feeService.update(updateFeeDto, userPayload);
  }
}
