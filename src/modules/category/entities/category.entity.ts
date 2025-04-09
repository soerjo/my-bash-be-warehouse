import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { UnitEntity } from "../../../modules/units/entities/unit.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'category', schema: 'warehouse' })
export class CategoryEntity extends MainEntityAbstract {
    @Column({unique: true})
    category_id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: true})
    bank_id: number;

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    unit_id?: string;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({ name: 'unit_id', referencedColumnName: 'unit_id'  })
    unit_type: UnitEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
