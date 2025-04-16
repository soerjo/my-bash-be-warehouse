import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import Decimal from "decimal.js";
import { TransactionTypeEntity } from "../../../modules/transaction-store/entities/transaction-type.entity";
import { HistoryEntityAbstract } from "../../../common/abstract/history-entity.abstract";

@Entity({ name: 'transaction-warehouse', schema: 'warehouse' })
export class TransactionWarehouseEntity extends HistoryEntityAbstract {
    @Column({ nullable: true })
    last_transaction_id?: string;

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

    @Column()
    transaction_type_id: number;  // 1: buy, 2: sell
    
    @Column({nullable: true})
    bank_id: number;

    @Column({nullable: true})
    warehouse_id: number;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id'  })
    category_type: CategoryEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;

    @ManyToOne(() => TransactionTypeEntity)
    @JoinColumn({ name: 'transaction_type_id', referencedColumnName: 'transaction_type_id'  })
    transactionType: TransactionTypeEntity;
  
}
