import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionWarehouseService } from '../services/transaction-warehouse.service';
import { CreateTransactionWarehouseDto } from '../dto/create-transaction-warehouse.dto';
import { UpdateTransactionWarehouseDto } from '../dto/update-transaction-warehouse.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';

@ApiTags('transaction-warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transaction-warehouse')
export class TransactionWarehouseController {
  constructor(private readonly transactionWarehouseService: TransactionWarehouseService) {}

  @Post()
  create(@Body() createTransactionWarehouseDto: CreateTransactionWarehouseDto) {
    return this.transactionWarehouseService.create(createTransactionWarehouseDto);
  }

  @Get()
  findAll() {
    return this.transactionWarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionWarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionWarehouseDto: UpdateTransactionWarehouseDto) {
    return this.transactionWarehouseService.update(+id, updateTransactionWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionWarehouseService.remove(+id);
  }
}
