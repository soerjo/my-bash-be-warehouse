import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @Length(5, 50)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(5, 50)
    code: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(5, 50)
    description: string;

    @ApiProperty()
    @IsInt()
    unit_id: number;
}
