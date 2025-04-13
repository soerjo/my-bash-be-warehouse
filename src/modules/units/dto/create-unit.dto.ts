import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateUnitDto {
    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim().toLocaleLowerCase())
    @Length(1, 80)
    name: string;

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim().toLocaleLowerCase())
    @Length(1, 50)
    code?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(0, 100)
    description?: string;
}
