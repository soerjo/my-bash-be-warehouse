
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";

@Entity({ name: 'transaction-store', schema: 'warehouse' })
export class TransactionWarehouseEntity extends MainEntityAbstract {
    @Column()
    last_transaction_id: string;

    @Column({type: 'decimal'})
    amount: number;

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    category_id?: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'category_id'  })
    category_type: CategoryEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
