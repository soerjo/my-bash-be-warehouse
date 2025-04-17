import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateFeeDto {
    @ApiProperty()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @IsNumber()
    percentage: number;

    @ApiPropertyOptional()
    @IsNumber()
    warehouse_id?: number;

    store_id?: number;
}
