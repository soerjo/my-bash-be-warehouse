import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MainEntityAbstract } from '../../../common/abstract/main-entity.abstract';
import { RoleEnum } from '../../../common/constant/role.constant';
// import { RegionEntity } from '../../../modules/region/entities/region.entity';
// import { BlesscomnAdminEntity } from '../../blesscomn/blesscomn/entities/blesscomn-admin.entity';

@Entity({ name: 'admin' })
export class AdminEntity extends MainEntityAbstract {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  telegram_user_id?: string;

  @Column({ enum: RoleEnum, nullable: true })
  role: RoleEnum;

  @Column({ nullable: true })
  region_id: number;

//   @ManyToOne(() => RegionEntity, (region) => region.admin)
//   @JoinColumn({ name: 'region_id' })
//   region: RegionEntity;

//   @OneToMany(() => BlesscomnAdminEntity, (bc) => bc.admin)
//   blesscomn: BlesscomnAdminEntity[];

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  temp_password: string;

  @BeforeInsert()
  async generateUniqueCode() {
    this.username = this.username ?? (await AdminEntity.createUniqueCode(this.region_id));
  }

  static async createUniqueCode(region_id: number): Promise<string> {
    const year = new Date().getFullYear().toString().slice(-2);
    const month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const latestUser = await this.createQueryBuilder('admin')
      .where('admin.region_id = :region_id', { region_id })
      .orderBy('admin.id', 'DESC')
      .withDeleted()
      .getOne();

    const incrementId = latestUser ? latestUser.id + 1 : 1;
    const incrementIdStr = ('0000' + incrementId).slice(-4);
    const incrementRegionId = ('0000' + region_id).slice(-4);

    return `USR-${year}${month}${incrementRegionId}${incrementIdStr}`;
  }
}