import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class SellItemDto{
    @ApiProperty()
    @IsNumber()
    store_id: number;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNumber()
    unit_price: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    message?: string;
}

export class DetailSellItemDto{
    @ApiProperty()
    @IsNumber()
    store_id: number;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsNumber()
    unit_price: number;
}

export class SellItemBulkDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trx_id?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    message?: string;
    
    @ApiProperty({ type: [SellItemDto] })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => SellItemDto)
    transactions: SellItemDto[];
}