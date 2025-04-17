import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { TransactionTypeEnum } from "../../../common/constant/transaction-type.constant";
import { IsRangeDate } from "../../../common/validation/isRangeDate.validation";
import { TransactionStatusEnum } from "src/common/constant/transaction-status.constant";

export class FindTransactionStoreDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    transaction_bank_id?: string;

    @IsOptional()
    @IsEnum(TransactionTypeEnum, { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiPropertyOptional({ type: [Number] })
    store_ids?: number[];

    @IsOptional()
    @IsEnum(TransactionTypeEnum, { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiPropertyOptional({ type: [Number] })
    category_store_ids?: number[];

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
    @IsRangeDate('start_date', 7)
    end_date?: Date;

    @IsOptional()
    @IsEnum(TransactionTypeEnum, { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiPropertyOptional({ type: [Number] })
    transaction_type_ids?: TransactionTypeEnum[];

    @IsOptional()
    @IsEnum(TransactionStatusEnum, { each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
          ? value.map((v) => Number(v))
          : [Number(value)],
      )
    @ApiPropertyOptional({ type: [Number] })
    transaction_status_ids?: TransactionStatusEnum[];

    transaction_bank_ids?: string[];

    bank_id?: number;
    warehouse_id?: number;
}