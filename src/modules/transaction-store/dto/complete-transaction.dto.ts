import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class CompleteTransactionStoreDto {
    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1, { message: 'ids must contain at least one item' })
    @IsString({ each: true })
    ids?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1, { message: 'ids must contain at least one item' })
    @IsString({ each: true })
    transaction_bank_id?: string[];
}
