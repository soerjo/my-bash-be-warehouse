import { PartialType } from '@nestjs/swagger';
import { CreateTransactionWarehouseDto } from './create-transaction-warehouse.dto';

export class UpdateTransactionWarehouseDto extends PartialType(CreateTransactionWarehouseDto) {}
