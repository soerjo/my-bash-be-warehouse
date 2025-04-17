import Decimal from "decimal.js"

export class ResponseFindStoreByIdDto {
    id: number
    name: string
    category_id: number
    category_name: string
    category_code: string
    category_description: string
    price: Decimal
    store_price: Decimal
    unit_id: number
    unit_name: string
    unit_code: string
    fee_id: number
    fee: Decimal
    bank_id: number
    warehouse_id: number
}