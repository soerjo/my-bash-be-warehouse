import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateWarehouseDto {
    @ApiProperty()
    @IsString()
    @Length(5, 50)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(3, 50)
    code?: string;

    @ApiProperty()
    @IsNumber()
    bank_id: number;
}
