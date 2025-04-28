import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Decimal from "decimal.js";
import { FeeEntity } from "../../../modules/fee/entities/fee.entity";

@Entity({ name: 'store', schema: 'warehouse' })
export class StoreEntity extends MainEntityAbstract {
  @Column({nullable: true})
  name: string;

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
  price: Decimal;

  @Column({nullable: true})
  fee_id?: number;

  @Column({nullable: true, type: 'text'})
  description: string;

  @Column({nullable: true})
  bank_id: number;

  @Column({nullable: true})
  warehouse_id: number;

  @Column({nullable: true})
  category_id?: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id'  })
  category: CategoryEntity;

  @ManyToOne(() => WarehouseEntity)
  @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
  warehouse: WarehouseEntity;

  @ManyToOne(() => FeeEntity, {onDelete: 'SET NULL'})
  @JoinColumn({ name: 'fee_id', referencedColumnName: 'id'  })
  fee: FeeEntity;

}
