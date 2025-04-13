import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UnitsService } from '../services/units.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindUnitDto } from '../dto/find-unit.dto';
import { FindBulkDto } from '../dto/find-bulk.dto';
import { Roles } from '../../../common/decorator/role.decorator';
import { RoleEnum } from '../../../common/constant/role.constant';

@ApiTags('units')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto, userPayload);
  }

  @Get()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindUnitDto) {
    return this.unitsService.findAll(dto, userPayload);
  }

  @Get('bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  getBulk(@Query() dto: FindBulkDto) {
    return this.unitsService.getBulks(dto.ids);
  }

  @Get(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitsService.update(+id, updateUnitDto, userPayload);
  }

  @Delete(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
    return this.unitsService.remove(+id, userPayload);
  }
}
