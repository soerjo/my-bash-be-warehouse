import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TransactionStatusEntity } from "./transaction-status.entity";
import { TransactionTypeEntity } from "./transaction-type.entity";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { StoreEntity } from "../../../modules/store/entities/store.entity";
import Decimal from "decimal.js";

@Entity({ name: 'transaction-store', schema: 'warehouse' })
export class TransactionStoreEntity extends MainEntityAbstract {
    @Column()
    transaction_id: string;

    @Column({
        default: 0, 
        type: 'decimal',
        precision: 18,
        scale: 4,
        transformer: {
          to: (value: Decimal | string | number): string => {
            return new Decimal(value ?? 0).toFixed(4, Decimal.ROUND_HALF_UP);
          },
          from: (value: string): Decimal => {
            return new Decimal(value ?? 0);
          },
        },
    })
    price_per_unit: Decimal;

    @Column({
        default: 0, 
        type: 'decimal',
        precision: 18,
        scale: 4,
        transformer: {
          to: (value: Decimal | string | number): string => {
            return new Decimal(value ?? 0).toFixed(4, Decimal.ROUND_HALF_UP);
          },
          from: (value: string): Decimal => {
            return new Decimal(value ?? 0);
          },
        },
    })
    amount: Decimal;

    @Column({
        default: 0, 
        type: 'decimal',
        precision: 18,
        scale: 4,
        transformer: {
          to: (value: Decimal | string | number): string => {
            return new Decimal(value ?? 0).toFixed(4, Decimal.ROUND_HALF_UP);
          },
          from: (value: string): Decimal => {
            return new Decimal(value ?? 0);
          },
        },
    })
    total_price: Decimal;

    @Column()
    transaction_type_id: number; // 1: deposit, 2: withdraw, 3: transfer

    @Column({nullable: true})
    message?: string;

    @Column()
    transaction_status_id: number; // 1: pending, 2: success, 3: failed

    @Column({nullable: true})
    bank_id: number;

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    store_id?: number;

    @ManyToOne(() => TransactionStatusEntity)
    @JoinColumn({ name: 'transaction_status_id', referencedColumnName: 'transaction_status_id'  })
    transactionStatus: TransactionStatusEntity;

    @ManyToOne(() => TransactionTypeEntity)
    @JoinColumn({ name: 'transaction_type_id', referencedColumnName: 'transaction_type_id'  })
    transactionType: TransactionTypeEntity;

    @ManyToOne(() => StoreEntity)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id'  })
    store: StoreEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
