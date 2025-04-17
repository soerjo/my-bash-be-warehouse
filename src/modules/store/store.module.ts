import { Module } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { StoreController } from './controllers/store.controller';
import { StoreRepository } from './repositories/store.repository';
import { CategoryModule } from '../category/category.module';
import { FeeModule } from '../fee/fee.module';
import { StoreLogsRepository } from './repositories/store-logs.repository';

@Module({
  imports: [CategoryModule, FeeModule],
  controllers: [StoreController],
  providers: [
    StoreService, 
    StoreRepository,
    StoreLogsRepository,
  ],
  exports: [StoreService],
})
export class StoreModule {}
