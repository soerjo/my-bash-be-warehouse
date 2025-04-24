import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StoreService } from '../services/store.service';
import { CreateStoreDto } from '../dto/create-store.dto';
import { UpdateStoreDto } from '../dto/update-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindStoreDto } from '../dto/find-store.dto';
import { FindBulkDto } from '../dto/find-bulk.dto';
import { Roles } from '../../../common/decorator/role.decorator';
import { RoleEnum } from '../../../common/constant/role.constant';
import { FindLogsStoreDto } from '../dto/find-log-store.dto';
import { BankService } from '../../../modules/bank/services/bank.service';

@ApiTags('store')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly bankService: BankService,
  ) {}

  @Post()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  create(@CurrentUser() userPayload: IJwtPayload, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto, userPayload);
  }

  @Get()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindStoreDto) {
    return this.storeService.findAll(dto, userPayload);
  }

  @Get('bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  getBulk(@Query() dto: FindBulkDto, @CurrentUser() userPayload: IJwtPayload) {
    return this.storeService.findOneByStoreIds(dto.ids, userPayload);
  }
  
  @Get(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Get('logs/:id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  getLogs(@Param('id') id: string, @Query() dto: FindLogsStoreDto, @CurrentUser() userPayload: IJwtPayload) {
    return this.storeService.getLogs(+id, dto, userPayload);
  }

  @Patch(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  async update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    const transactionBankIds = await this.storeService.update(+id, updateStoreDto, userPayload);

    // do sync to bank service
    await this.bankService.syncBankService(transactionBankIds, userPayload.token);
  }

  @Delete(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
    return this.storeService.remove(+id, userPayload);
  }
}
