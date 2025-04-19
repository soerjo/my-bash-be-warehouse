import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TransactionStatusEnum } from '../../../common/constant/transaction-status.constant';
import { IsRangeDate } from '../../../common/validation/isRangeDate.validation';

export class getTotalByCategoryDto {
  @IsOptional()
  @IsEnum(TransactionStatusEnum, { each: true })
  @Transform(({ value }) =>
      Array.isArray(value)
        ? value.map((v) => Number(v))
        : [Number(value)],
    )
  @ApiPropertyOptional({ 
    enum: TransactionStatusEnum, 
    type: [Number], 
    description: `
    Transaction status
    1. Pending
    2. Success
    3. Failed
    ` 
   })
   transaction_status_ids?: TransactionStatusEnum[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  warehouse_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  // @IsGreaderDate('start_date')
  @IsRangeDate('start_date', 30)
  end_date?: Date;
}
