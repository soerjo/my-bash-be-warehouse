import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class getWarehouseFeeDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    warehouse_id: number;
}