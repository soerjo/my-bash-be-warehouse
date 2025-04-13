import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindCategoryDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    bank_id?: number;
    warehouse_id?: number;
    // Add any specific properties or filters for finding categories if needed
}