import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { IsRangeDate } from "src/common/validation/isRangeDate.validation";

export class FindLogsStoreDto extends PaginationDto {   
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    category_id?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    // @IsGreaderDate('start_date')
    @IsRangeDate('start_date', 7)
    end_date?: Date;

    store_id?: number

    bank_id?: number;
    warehouse_id?: number;
}