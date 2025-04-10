import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TransactionWarehouseService } from '../services/transaction-warehouse.service';
import { CreateTransactionWarehouseDto } from '../dto/create-transaction-warehouse.dto';
import { UpdateTransactionWarehouseDto } from '../dto/update-transaction-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { FindTransactionStoreDto } from '../../../modules/transaction-store/dto/find-transaction-store.dto';

@ApiTags('transaction-warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transaction-warehouse')
export class TransactionWarehouseController {
  constructor(private readonly transactionWarehouseService: TransactionWarehouseService) {}

  // @Post()
  // create(@CurrentUser() userPayload: IJwtPayload, @Body() createTransactionWarehouseDto: CreateTransactionWarehouseDto) {
  //   return this.transactionWarehouseService.create(createTransactionWarehouseDto);
  // }

  @Get()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindTransactionStoreDto) {
    return this.transactionWarehouseService.findAll(dto, userPayload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionWarehouseService.findOne(+id);
  }

  // @Patch(':id')
  // update(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateTransactionWarehouseDto: UpdateTransactionWarehouseDto) {
  //   return this.transactionWarehouseService.update(+id, updateTransactionWarehouseDto);
  // }

  // @Delete(':id')
  // remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
  //   return this.transactionWarehouseService.remove(+id);
  // }
}
