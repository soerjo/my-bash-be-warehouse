import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim().toLowerCase())
    name: string;
    
    @ApiProperty()
    @IsNumber()
    price: number;
    
    @ApiProperty()
    @IsInt()
    category_id: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_custom_fee?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_default_fee?: boolean;


    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    custom_fee?: number;
}
