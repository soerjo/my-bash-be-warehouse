import { Module } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
