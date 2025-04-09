import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";
import { CategoryEntity } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TransactionStatusEntity } from "./transaction-status.entity";
import { TransactionTypeEntity } from "./transaction-type.entity";
import { WarehouseEntity } from "../../../modules/warehouse/entities/warehouse.entity";

@Entity({ name: 'transaction-store', schema: 'warehouse' })
export class TransactionStoreEntity extends MainEntityAbstract {
    @Column()
    transaction_id: string;

    @Column({type: 'decimal'})
    price_per_unit: number;

    @Column({type: 'decimal'})
    amount: number;

    @Column({type: 'decimal'})
    total_price: number;

    @Column()
    transaction_type_id: number; // 1: deposit, 2: withdraw, 3: transfer

    @Column()
    message: string;

    @Column()
    transaction_status_id: number; // 1: pending, 2: success, 3: failed

    @Column({nullable: true})
    bank_id: number;

    @Column({nullable: true})
    warehouse_id: number;

    @Column({nullable: true})
    category_id?: string;

    @ManyToOne(() => TransactionStatusEntity)
    @JoinColumn({ name: 'transaction_status_id', referencedColumnName: 'transaction_status_id'  })
    transactionStatus: TransactionStatusEntity;

    @ManyToOne(() => TransactionTypeEntity)
    @JoinColumn({ name: 'transaction_type_id', referencedColumnName: 'transaction_type_id'  })
    transactionType: TransactionTypeEntity;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'category_id'  })
    category_type: CategoryEntity;

    @ManyToOne(() => WarehouseEntity)
    @JoinColumn({ name: 'warehouse_id', referencedColumnName: 'id'  })
    warehouse: WarehouseEntity;
}
