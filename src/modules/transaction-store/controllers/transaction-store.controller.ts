import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { TransactionStoreService } from '../services/transaction-store.service';
import { UpdateTransactionStoreDto } from '../dto/update-transaction-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { FindTransactionStoreDto } from '../dto/find-transaction-store.dto';
import { DepositItemBulkDto, DepositItemDto } from '../dto/deposit-item.dto';
import { SellItemBulkDto, SellItemDto } from '../dto/sell-item.dto';
import { Roles } from '../../../common/decorator/role.decorator';
import { RoleEnum } from '../../../common/constant/role.constant';
import { GetBulkTransactionStoreDto } from '../dto/get-bulk-transaction.dto';

@ApiTags('transaction-store')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transaction-store')
export class TransactionStoreController {
  constructor(private readonly transactionStoreService: TransactionStoreService) {}

  // @Post('deposit/')
  // @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  // depositItem(@CurrentUser() userPayload: IJwtPayload, @Body() dto: DepositItemDto) {
  //   return this.transactionStoreService.depositItem(dto, userPayload);
  // }

  @Post('deposit/bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  depositItemBulk(@CurrentUser() userPayload: IJwtPayload, @Body() dto: DepositItemBulkDto) {
    return this.transactionStoreService.depositItemBulk(dto, userPayload);
  }

  // @Post('sell/')
  // @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  // sellItem(@CurrentUser() userPayload: IJwtPayload, @Body() dto: SellItemDto) {
  //   return this.transactionStoreService.sellItem(dto, userPayload);
  // }

  @Post('sell/bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  sellItemBulk(@CurrentUser() userPayload: IJwtPayload, @Body() dto: SellItemBulkDto) {
    return this.transactionStoreService.sellItemBulk(dto, userPayload);
  }

  @Get()
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindTransactionStoreDto) {
    return this.transactionStoreService.findAll(dto, userPayload);
  }
  
  @Get('bulk')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  getBulk(@Query() dto: GetBulkTransactionStoreDto) {
    return this.transactionStoreService.getBulkByTransactionBankIds(dto.transaction_bank_ids);
  }

  @Get(':id')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  findOne(@Param('id') id: string) {
    return this.transactionStoreService.findOne(id);
  }

  @Patch('complete')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  updateSuccess(@CurrentUser() userPayload: IJwtPayload, @Body() updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return this.transactionStoreService.updateStatusSuccess(updateTransactionStoreDto, userPayload);
  }

  @Patch('cancel')
  @Roles([ RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN_BANK ])
  updateFailed(@CurrentUser() userPayload: IJwtPayload, @Body() updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return this.transactionStoreService.updateStatusFailed(updateTransactionStoreDto, userPayload);
  }
}
