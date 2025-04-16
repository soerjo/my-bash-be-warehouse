import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TransactionStatusEntity } from "./transaction-status.entity";
import { TransactionTypeEntity } from "./transaction-type.entity";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { StoreEntity } from "../../../modules/store/entities/store.entity";
import Decimal from "decimal.js";
import { HistoryEntityAbstract } from "../../../common/abstract/history-entity.abstract";

@Entity({ name: 'transaction-store', schema: 'warehouse' })
export class TransactionStoreEntity extends HistoryEntityAbstract {
  @Column({ nullable: true })
  trx_id?: string;

  @Column({ nullable: true })
  transaction_bank_id?: string;

  @Column()
  store_id: number;

  @Column()
  store_name: string;

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
  store_price: Decimal;

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
  fee_percent?: Decimal;

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
  fee_price?: Decimal;

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
  final_price: Decimal;

  @Column()
  category_store_id: number;

  @Column()
  category_name: string;

  @Column()
  category_code: string;

  @Column()
  unit_id: number;

  @Column()
  unit_name: string;

  @Column()
  unit_code: string;

  @Column({nullable: true})
  message?: string;

  @Column()
  transaction_status_id: number; // 1: pending, 2: success, 3: failed

  @Column()
  transaction_type_id: number; // 1: buy, 2: sell

  @Column({nullable: true})
  bank_id: number;

  @Column({nullable: true})
  warehouse_id: number;

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
