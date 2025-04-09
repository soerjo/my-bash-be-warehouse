import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionStoreService } from '../services/transaction-store.service';
import { CreateTransactionStoreDto } from '../dto/create-transaction-store.dto';
import { UpdateTransactionStoreDto } from '../dto/update-transaction-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';

@ApiTags('transaction-store')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transaction-store')
export class TransactionStoreController {
  constructor(private readonly transactionStoreService: TransactionStoreService) {}

  @Post()
  create(@Body() createTransactionStoreDto: CreateTransactionStoreDto) {
    return this.transactionStoreService.create(createTransactionStoreDto);
  }

  @Get()
  findAll() {
    return this.transactionStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return this.transactionStoreService.update(+id, updateTransactionStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionStoreService.remove(+id);
  }
}
