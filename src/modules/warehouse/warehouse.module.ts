import { Module } from '@nestjs/common';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { CategoryModule } from '../category/category.module';
import { FeeModule } from '../fee/fee.module';

@Module({
  imports: [CategoryModule, FeeModule],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
  exports: [WarehouseService],
})
export class WarehouseModule {}
