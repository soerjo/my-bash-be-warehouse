import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTransactionStoreDto } from './create-transaction-store.dto';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionStoreDto extends PartialType(CreateTransactionStoreDto) {
    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1, { message: 'ids must contain at least one item' })
    @IsNumber({}, { each: true })
    ids?: number[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1, { message: 'ids must contain at least one item' })
    @IsNumber({}, { each: true })
    transaction_bank_id?: string[];
}
