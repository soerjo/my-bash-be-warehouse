import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class FindStoreDto extends PaginationDto {   
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    category_id?: number;

    bank_id?: number;
    warehouse_id?: number;
    // page: number;
    // take: number;
    // name: string;
    // code: string;
    // status: string;
    // created_at_from: Date;
    // created_at_to: Date;
}