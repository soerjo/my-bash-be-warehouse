import Decimal from "decimal.js";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'fee', schema: 'warehouse' })
export class FeeEntity extends MainEntityAbstract {
    @Column({nullable: true})
    store_id: number;

    @Column({
        default: 0, 
        type: 'decimal',
        precision: 18,
        scale: 2,
        transformer: {
            to: (value: Decimal | string | number): string => {
            return new Decimal(value ?? 0).toFixed(2, Decimal.ROUND_HALF_UP);
            },
            from: (value: string): Decimal => {
            return new Decimal(value ?? 0);
            },
        },
    })
    percentage: Decimal;

    @Column({nullable: true})
    bank_id: number;

    @Column({nullable: true})
    warehouse_id: number;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
