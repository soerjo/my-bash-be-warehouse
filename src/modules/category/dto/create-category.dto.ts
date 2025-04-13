import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim().toLocaleLowerCase())
    @Length(1, 80)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim().split(" ").join("_").toUpperCase())
    @Length(1, 50)
    code: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(5, 100)
    description: string;

    @ApiProperty()
    @IsInt()
    unit_id: number;
}
