import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateUnitDto {
    @ApiProperty()
    @IsString()
    @Length(1, 20)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(1, 20)
    code?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(1, 50)
    description?: string;
}
