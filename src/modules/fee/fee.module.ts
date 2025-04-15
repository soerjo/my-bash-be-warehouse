import { Module } from '@nestjs/common';
import { FeeService } from './services/fee.service';
import { FeeController } from './controllers/fee.controller';
import { FeeRepository } from './repositories/fee.repository';

@Module({
  controllers: [FeeController],
  providers: [
    FeeService, 
    FeeRepository,
  ],
  exports: [FeeService]
})
export class FeeModule {}
