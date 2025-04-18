import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class getTotalByCategoryDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value.map((v) => Number(v)) : [Number(value)]))
  @ApiPropertyOptional({ type: [Number] })
  transaction_status_ids?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  warehouse_id?: number;
}
