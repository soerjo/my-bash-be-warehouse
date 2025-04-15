import { Column, Entity } from 'typeorm';
import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';

@Entity({ name: 'warehouse', schema: 'warehouse' })
export class WarehouseEntity extends MainEntityAbstract {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({nullable: true})
  bank_id: number;

  @Column({nullable: true})
  trx_id: string;
}
