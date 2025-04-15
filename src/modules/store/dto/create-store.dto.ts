import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    @Transform(({ value }) => value.trim().toLowerCase())
    name: string;
    
    @ApiProperty()
    @IsNumber()
    price: number;
    
    @ApiProperty()
    @IsInt()
    category_id: number;
}
