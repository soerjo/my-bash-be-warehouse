import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Decimal from "decimal.js";
import { HistoryEntityAbstract } from "../../../common/abstract/history-entity.abstract";

@Entity({ name: 'store-logs', schema: 'warehouse' })
export class StoreLogEntity extends HistoryEntityAbstract {
  @Column({nullable: true})
  last_logs_id: string;

  @Column()
  store_id: number;

  @Column({nullable: true})
  name: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  price: Decimal;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  fee: Decimal;

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
}
