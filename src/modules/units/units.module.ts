import { Module } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';
import { UnitsRepository } from './repositories/unit.repository';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, UnitsRepository],
  exports: [UnitsService]
})
export class UnitsModule {}
