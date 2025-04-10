import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateTransactionStoreDto {
    @ApiProperty()
    @IsString()
    transaction_id: string;
        
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    amount: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    message?: string;
    
    @ApiProperty()
    @IsInt()
    store_id: number;
}

export class CreateTransactionStoreArrayDto {
    @ApiProperty({ type: [CreateTransactionStoreDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTransactionStoreDto)
    transactions: CreateTransactionStoreDto[];
  }