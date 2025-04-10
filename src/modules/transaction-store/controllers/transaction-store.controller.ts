import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { TransactionStoreService } from '../services/transaction-store.service';
import { CreateTransactionStoreArrayDto, CreateTransactionStoreDto } from '../dto/create-transaction-store.dto';
import { UpdateTransactionStoreDto } from '../dto/update-transaction-store.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { CurrentUser } from '../../../common/decorator/jwt-payload.decorator';
import { FindTransactionStoreDto } from '../dto/find-transaction-store.dto';

@ApiTags('transaction-store')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transaction-store')
export class TransactionStoreController {
  constructor(private readonly transactionStoreService: TransactionStoreService) {}

  @Post(':transaction')
  deposit(@Param('transaction') transactionType: string, @CurrentUser() userPayload: IJwtPayload, @Body() {transactions}: CreateTransactionStoreArrayDto) {
    switch (transactionType) {
      case 'deposit':
        return this.transactionStoreService.deposit(transactions, userPayload);
    
      case 'transfer':
        return this.transactionStoreService.transfer(transactions, userPayload);

      default:
        throw new BadRequestException('Transaction type not supported');
    }
  }

  @Get()
  findAll(@CurrentUser() userPayload: IJwtPayload, @Query() dto: FindTransactionStoreDto) {
    return this.transactionStoreService.findAll(dto, userPayload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionStoreService.findOne(+id);
  }

  @Patch('/success/:id')
  updateSuccess(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return this.transactionStoreService.updateStatusSuccess(+id, updateTransactionStoreDto, userPayload);
  }

  @Patch('/failed/:id')
  updateFailed(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string, @Body() updateTransactionStoreDto: UpdateTransactionStoreDto) {
    return this.transactionStoreService.updateStatusFailed(+id, updateTransactionStoreDto, userPayload);
  }

  // @Delete(':id')
  // remove(@CurrentUser() userPayload: IJwtPayload, @Param('id') id: string) {
  //   return this.transactionStoreService.remove(+id, userPayload);
  // }
}
