import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class FindBulkDto {
    @IsInt({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiProperty({isArray: true, type: 'number', description: 'Array of bank IDs'})
    ids: number[];
}