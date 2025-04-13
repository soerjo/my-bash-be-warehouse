import { PaginationDto } from "../../../common/dto/pagination.dto";

export class FindStoreDto extends PaginationDto {   
    bank_id?: number;
    warehouse_id?: number;
    // page: number;
    // take: number;
    // name: string;
    // code: string;
    // status: string;
    // created_at_from: Date;
    // created_at_to: Date;
}