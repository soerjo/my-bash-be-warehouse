
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import Decimal from "decimal.js";

@Entity({ name: 'transaction-warehouse', schema: 'warehouse' })
export class TransactionWarehouseEntity extends MainEntityAbstract {
    @Column()
    last_transaction_id: string;

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

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    category_id?: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id'  })
    category_type: CategoryEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
