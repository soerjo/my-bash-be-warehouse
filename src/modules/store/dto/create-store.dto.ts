import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";

export class CreateStoreDto {
    
    @ApiProperty()
    @IsNumber()
    price: number;
    
    @ApiProperty()
    @IsInt()
    category_id: number;
}
