import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'unit', schema: 'warehouse' })
export class UnitEntity extends MainEntityAbstract {
    @Column({unique: true})
    unit_id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    description?: string;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
