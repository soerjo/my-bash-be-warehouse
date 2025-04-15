import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindFeeDto extends PaginationDto {

    warehouse_id?: number;
}