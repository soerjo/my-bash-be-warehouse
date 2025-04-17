import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GetBulkTransactionStoreDto {
    @IsOptional()
    @IsString({ each: true })
    @Transform(({ value }) =>
        Array.isArray(value)
            ? value.map((v) => String(v))
            : [String(value)],
        )
    @ApiPropertyOptional({ type: [String] })
    transaction_bank_ids?: string[];
}