import { Column, Entity } from "typeorm";
import { MainEntityAbstract } from "../../../common/abstract/main-entity.abstract";

@Entity({ name: 'transaction_status', schema: 'warehouse' })
export class TransactionStatusEntity extends MainEntityAbstract {
    @Column({unique: true})
    transaction_status_id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({nullable: true})
    description?: string;
}