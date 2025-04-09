import { PartialType } from '@nestjs/swagger';
import { CreateTransactionStoreDto } from './create-transaction-store.dto';

export class UpdateTransactionStoreDto extends PartialType(CreateTransactionStoreDto) {}
