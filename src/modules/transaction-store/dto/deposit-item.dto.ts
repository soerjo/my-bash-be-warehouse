import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class DetailDepositItemDto {
    @ApiProperty()
    @IsNumber()
    store_id: number;

    @ApiProperty()
    @IsNumber()
    amount: number;
}

export class DepositItemDto {
    @ApiProperty()
    @IsNumber()
    store_id: number;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    transaction_bank_id: string;

    @ApiProperty()
    @IsString()
    message: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;
}

export class DepositItemBulkDto {
    @ApiProperty()
    @IsString()
    transaction_bank_id: string;

    @ApiProperty()
    @IsString()
    message: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

    @ApiProperty({ type: [DetailDepositItemDto] })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => DetailDepositItemDto)
    transactions: DetailDepositItemDto[];
}